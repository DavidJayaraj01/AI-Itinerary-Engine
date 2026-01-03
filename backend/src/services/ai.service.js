const { prisma } = require('../config/database');
const { AppError, calculateDaysBetween } = require('../utils/helpers');

/**
 * AI Service - Backend Logic Only
 * 
 * This service provides AI-powered features for trip planning.
 * Currently implements rule-based algorithms. Can be enhanced with
 * external AI APIs (OpenAI, etc.) using environment variables.
 */

const aiService = {
  /**
   * Generate itinerary suggestions based on trip details
   * POST /api/ai/generate-itinerary
   * 
   * Input: { trip_id, preferences: { pace, budget_level, interests } }
   * Output: { sections: [], items: [], estimated_cost, suggestions: [] }
   */
  generateItinerary: async (userId, requestData) => {
    const { trip_id, preferences = {} } = requestData;
    const { pace = 'moderate', budget_level = 'moderate', interests = [] } = preferences;

    // Verify trip access
    const trip = await prisma.trip.findUnique({
      where: { id: trip_id },
      include: {
        itinerary_sections: {
          include: {
            itinerary_items: true,
          },
        },
      },
    });

    if (!trip) {
      throw new AppError('Trip not found', 404);
    }

    if (trip.user_id !== userId) {
      throw new AppError('You do not have permission to generate itinerary for this trip', 403);
    }

    // Calculate trip parameters
    const totalDays = calculateDaysBetween(trip.start_date, trip.end_date);
    const dailyBudget = trip.total_budget ? parseFloat(trip.total_budget) / totalDays : 100;

    // Get activities for trip destinations (if we know the city)
    const activities = await prisma.activity.findMany({
      where: interests.length > 0 ? {
        category: { in: interests },
      } : {},
      include: {
        activity_tags: {
          include: {
            tag: true,
          },
        },
      },
      take: 50,
      orderBy: { rating: 'desc' },
    });

    // Generate itinerary structure based on pace
    const itemsPerDay = pace === 'relaxed' ? 3 : pace === 'packed' ? 6 : 4;

    const generatedSections = [];
    const generatedItems = [];
    let totalEstimatedCost = 0;

    for (let day = 1; day <= totalDays; day++) {
      // Morning section
      const morningSection = {
        day_number: day,
        section_order: 1,
        title: `Day ${day} - Morning`,
        description: `Morning activities for day ${day}`,
        start_time: new Date(trip.start_date.getTime() + (day - 1) * 86400000 + 28800000), // 8 AM
        end_time: new Date(trip.start_date.getTime() + (day - 1) * 86400000 + 43200000), // 12 PM
      };

      // Afternoon section
      const afternoonSection = {
        day_number: day,
        section_order: 2,
        title: `Day ${day} - Afternoon`,
        description: `Afternoon activities for day ${day}`,
        start_time: new Date(trip.start_date.getTime() + (day - 1) * 86400000 + 50400000), // 2 PM
        end_time: new Date(trip.start_date.getTime() + (day - 1) * 86400000 + 64800000), // 6 PM
      };

      generatedSections.push(morningSection, afternoonSection);

      // Generate items for each section
      const dayActivities = activities.slice((day - 1) * itemsPerDay, day * itemsPerDay);

      dayActivities.forEach((activity, index) => {
        const item = {
          section_order: index < itemsPerDay / 2 ? 1 : 2,
          activity_id: activity.id,
          title: activity.name,
          description: activity.description,
          location_name: activity.address,
          cost: activity.avg_cost ? parseFloat(activity.avg_cost) : dailyBudget / itemsPerDay,
          notes: `Recommended activity based on your interests`,
        };

        generatedItems.push(item);
        totalEstimatedCost += item.cost;
      });
    }

    // Generate AI suggestions
    const suggestions = [
      {
        type: 'budget',
        message: `Based on your total budget of $${trip.total_budget || 'not set'}, plan for approximately $${dailyBudget.toFixed(2)} per day.`,
      },
      {
        type: 'pacing',
        message: `With a ${pace} pace, you'll have ${itemsPerDay} activities per day. Consider leaving time for spontaneous discoveries!`,
      },
      {
        type: 'timing',
        message: `Best time to visit attractions is typically early morning or late afternoon to avoid crowds.`,
      },
    ];

    if (totalEstimatedCost > (trip.total_budget || Infinity)) {
      suggestions.push({
        type: 'warning',
        message: `Estimated cost ($${totalEstimatedCost.toFixed(2)}) exceeds your budget. Consider reducing activities or choosing budget-friendly options.`,
      });
    }

    return {
      trip_id,
      sections: generatedSections,
      items: generatedItems,
      estimated_cost: totalEstimatedCost,
      daily_breakdown: {
        days: totalDays,
        items_per_day: itemsPerDay,
        avg_cost_per_day: totalEstimatedCost / totalDays,
      },
      suggestions,
    };
  },

  /**
   * Optimize budget allocation
   * POST /api/ai/optimize-budget
   * 
   * Input: { trip_id, total_budget, priorities: [] }
   * Output: { recommended_budgets: [], savings_tips: [] }
   */
  optimizeBudget: async (userId, requestData) => {
    const { trip_id, total_budget, priorities = [] } = requestData;

    // Verify trip access
    const trip = await prisma.trip.findUnique({
      where: { id: trip_id },
      include: {
        trip_budgets: true,
        expenses: true,
        itinerary_sections: {
          include: {
            itinerary_items: true,
          },
        },
      },
    });

    if (!trip) {
      throw new AppError('Trip not found', 404);
    }

    if (trip.user_id !== userId) {
      throw new AppError('You do not have permission to optimize budget for this trip', 403);
    }

    const totalDays = calculateDaysBetween(trip.start_date, trip.end_date);
    const budgetToAllocate = total_budget || parseFloat(trip.total_budget) || 1000;

    // Default budget allocation percentages
    const defaultAllocation = {
      accommodation: 0.35,
      food: 0.25,
      transportation: 0.15,
      activities: 0.15,
      shopping: 0.05,
      miscellaneous: 0.05,
    };

    // Adjust based on priorities
    const allocation = { ...defaultAllocation };
    if (priorities.includes('luxury')) {
      allocation.accommodation = 0.45;
      allocation.food = 0.30;
      allocation.activities = 0.15;
    } else if (priorities.includes('adventure')) {
      allocation.activities = 0.30;
      allocation.accommodation = 0.25;
      allocation.food = 0.20;
    } else if (priorities.includes('budget')) {
      allocation.accommodation = 0.25;
      allocation.food = 0.20;
      allocation.transportation = 0.20;
      allocation.activities = 0.20;
    }

    // Generate recommended budgets
    const recommendedBudgets = Object.entries(allocation).map(([category, percentage]) => ({
      category,
      planned_amount: budgetToAllocate * percentage,
      percentage: percentage * 100,
      daily_amount: (budgetToAllocate * percentage) / totalDays,
    }));

    // Calculate current spending
    const currentSpending = trip.expenses.reduce((acc, expense) => {
      if (!acc[expense.category]) acc[expense.category] = 0;
      acc[expense.category] += parseFloat(expense.amount);
      return acc;
    }, {});

    // Generate savings tips
    const savingsTips = [
      {
        category: 'accommodation',
        tip: 'Book accommodations in advance for better rates. Consider hostels or vacation rentals for budget savings.',
      },
      {
        category: 'food',
        tip: 'Mix fine dining with local street food. Shopping at local markets can save 30-50% on food costs.',
      },
      {
        category: 'transportation',
        tip: 'Use public transportation when possible. Consider multi-day passes for additional savings.',
      },
      {
        category: 'activities',
        tip: 'Many museums and attractions offer free entry on certain days. Research free walking tours.',
      },
    ];

    // Add specific warnings if overspending
    Object.entries(currentSpending).forEach(([category, spent]) => {
      const recommended = recommendedBudgets.find(b => b.category === category);
      if (recommended && spent > recommended.planned_amount * 0.8) {
        savingsTips.push({
          category,
          tip: `⚠️ You've spent ${((spent / recommended.planned_amount) * 100).toFixed(0)}% of recommended ${category} budget. Consider adjusting spending.`,
          priority: 'high',
        });
      }
    });

    return {
      trip_id,
      total_budget: budgetToAllocate,
      recommended_budgets: recommendedBudgets,
      current_spending: currentSpending,
      savings_tips: savingsTips,
      summary: {
        total_days: totalDays,
        daily_budget: budgetToAllocate / totalDays,
        total_spent: Object.values(currentSpending).reduce((a, b) => a + b, 0),
      },
    };
  },

  /**
   * Generate trip summary
   * POST /api/ai/trip-summary
   * 
   * Input: { trip_id }
   * Output: { summary: {}, highlights: [], recommendations: [] }
   */
  generateTripSummary: async (userId, requestData) => {
    const { trip_id } = requestData;

    // Get comprehensive trip data
    const trip = await prisma.trip.findUnique({
      where: { id: trip_id },
      include: {
        user: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
        itinerary_sections: {
          include: {
            itinerary_items: {
              include: {
                activity: {
                  include: {
                    activity_tags: {
                      include: {
                        tag: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        trip_budgets: true,
        expenses: true,
        trip_stats: true,
      },
    });

    if (!trip) {
      throw new AppError('Trip not found', 404);
    }

    const hasAccess = trip.user_id === userId || 
      await prisma.userTripLink.findFirst({
        where: { user_id: userId, trip_id },
      });

    if (!hasAccess) {
      throw new AppError('You do not have access to this trip', 403);
    }

    // Calculate metrics
    const totalDays = calculateDaysBetween(trip.start_date, trip.end_date);
    const totalExpenses = trip.expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
    const totalActivities = trip.itinerary_sections.reduce(
      (sum, s) => sum + s.itinerary_items.length, 0
    );

    // Extract unique cities/locations
    const locations = new Set();
    trip.itinerary_sections.forEach(section => {
      if (section.city) locations.add(section.city);
      section.itinerary_items.forEach(item => {
        if (item.location_name) locations.add(item.location_name);
      });
    });

    // Extract activity categories
    const categories = new Set();
    trip.itinerary_sections.forEach(section => {
      section.itinerary_items.forEach(item => {
        if (item.activity?.category) categories.add(item.activity.category);
      });
    });

    // Generate highlights
    const highlights = [
      `${totalDays}-day adventure`,
      `${totalActivities} planned activities`,
      `Visiting ${locations.size} unique locations`,
      `Exploring ${categories.size} different activity types`,
    ];

    if (trip.total_budget) {
      const budgetRemaining = parseFloat(trip.total_budget) - totalExpenses;
      highlights.push(
        budgetRemaining > 0 
          ? `$${budgetRemaining.toFixed(2)} budget remaining`
          : `Budget exceeded by $${Math.abs(budgetRemaining).toFixed(2)}`
      );
    }

    // Generate recommendations
    const recommendations = [];

    if (totalActivities < totalDays * 2) {
      recommendations.push({
        type: 'planning',
        message: 'Consider adding more activities to fill your itinerary.',
      });
    }

    if (trip.status === 'planning') {
      recommendations.push({
        type: 'status',
        message: 'Ready to confirm your trip? Update status to "confirmed" when ready!',
      });
    }

    if (!trip.trip_budgets.length) {
      recommendations.push({
        type: 'budget',
        message: 'Set category budgets to better track your spending.',
      });
    }

    return {
      trip_id,
      summary: {
        title: trip.title,
        description: trip.description,
        dates: {
          start: trip.start_date,
          end: trip.end_date,
          duration: `${totalDays} days`,
        },
        status: trip.status,
        locations: Array.from(locations),
        categories: Array.from(categories),
      },
      statistics: {
        total_activities: totalActivities,
        total_expenses: totalExpenses,
        total_budget: trip.total_budget ? parseFloat(trip.total_budget) : null,
        budget_used_percentage: trip.total_budget 
          ? (totalExpenses / parseFloat(trip.total_budget)) * 100 
          : null,
        avg_cost_per_day: totalExpenses / totalDays,
      },
      highlights,
      recommendations,
    };
  },
};

module.exports = aiService;
