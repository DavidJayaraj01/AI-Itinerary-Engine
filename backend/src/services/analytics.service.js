const { prisma } = require('../config/database');
const { AppError, calculateDaysBetween } = require('../utils/helpers');

const analyticsService = {
  // Calculate and update trip stats
  calculateTripStats: async (tripId, userId) => {
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: {
        expenses: true,
        itinerary_sections: {
          include: {
            itinerary_items: {
              include: {
                activity: true,
              },
            },
          },
        },
      },
    });

    if (!trip) {
      throw new AppError('Trip not found', 404);
    }

    // Check access
    const hasAccess = trip.user_id === userId || 
      await prisma.userTripLink.findFirst({
        where: { user_id: userId, trip_id: tripId },
      });

    if (!hasAccess) {
      throw new AppError('You do not have access to this trip', 403);
    }

    // Calculate total days
    const totalDays = calculateDaysBetween(trip.start_date, trip.end_date);

    // Calculate total expenses
    const totalExpenses = trip.expenses.reduce(
      (sum, expense) => sum + parseFloat(expense.amount),
      0
    );

    // Count total activities (unique activities + custom items)
    const activityIds = new Set();
    let customItemsCount = 0;

    trip.itinerary_sections.forEach(section => {
      section.itinerary_items.forEach(item => {
        if (item.activity_id) {
          activityIds.add(item.activity_id);
        } else {
          customItemsCount++;
        }
      });
    });

    const totalActivities = activityIds.size + customItemsCount;

    // Calculate average cost per day
    const avgCostPerDay = totalDays > 0 ? totalExpenses / totalDays : 0;

    // Update or create trip stats
    const stats = await prisma.tripStats.upsert({
      where: { trip_id: tripId },
      update: {
        total_days: totalDays,
        total_expenses: totalExpenses,
        total_activities: totalActivities,
        avg_cost_per_day: avgCostPerDay,
        last_calculated_at: new Date(),
      },
      create: {
        trip_id: tripId,
        total_days: totalDays,
        total_expenses: totalExpenses,
        total_activities: totalActivities,
        avg_cost_per_day: avgCostPerDay,
      },
    });

    return stats;
  },

  // Get trip stats
  getTripStats: async (tripId, userId) => {
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
    });

    if (!trip) {
      throw new AppError('Trip not found', 404);
    }

    // Check access
    const hasAccess = trip.user_id === userId || 
      await prisma.userTripLink.findFirst({
        where: { user_id: userId, trip_id: tripId },
      });

    if (!hasAccess) {
      throw new AppError('You do not have access to this trip', 403);
    }

    // Get or calculate stats
    let stats = await prisma.tripStats.findUnique({
      where: { trip_id: tripId },
    });

    // If stats don't exist or are old (more than 1 hour), recalculate
    if (!stats || (new Date() - new Date(stats.last_calculated_at)) > 3600000) {
      stats = await this.calculateTripStats(tripId, userId);
    }

    // Get additional analytics
    const [expenses, budgets, sections] = await Promise.all([
      prisma.expense.findMany({
        where: { trip_id: tripId },
        select: {
          category: true,
          amount: true,
          expense_date: true,
        },
      }),
      prisma.tripBudget.findMany({
        where: { trip_id: tripId },
        select: {
          category: true,
          planned_amount: true,
        },
      }),
      prisma.itinerarySection.findMany({
        where: { trip_id: tripId },
        include: {
          itinerary_items: true,
        },
      }),
    ]);

    // Expenses by category
    const expensesByCategory = expenses.reduce((acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = 0;
      }
      acc[expense.category] += parseFloat(expense.amount);
      return acc;
    }, {});

    // Budget vs actual
    const budgetComparison = budgets.map(budget => {
      const spent = expensesByCategory[budget.category] || 0;
      return {
        category: budget.category,
        planned: parseFloat(budget.planned_amount),
        spent,
        remaining: parseFloat(budget.planned_amount) - spent,
        percentUsed: parseFloat(budget.planned_amount) > 0 
          ? (spent / parseFloat(budget.planned_amount)) * 100 
          : 0,
      };
    });

    // Daily breakdown
    const itemsPerDay = sections.reduce((acc, section) => {
      if (!acc[section.day_number]) {
        acc[section.day_number] = 0;
      }
      acc[section.day_number] += section.itinerary_items.length;
      return acc;
    }, {});

    return {
      ...stats,
      budgetComparison,
      expensesByCategory,
      itemsPerDay,
      trip: {
        id: trip.id,
        title: trip.title,
        start_date: trip.start_date,
        end_date: trip.end_date,
        status: trip.status,
        total_budget: trip.total_budget,
      },
    };
  },
};

module.exports = analyticsService;
