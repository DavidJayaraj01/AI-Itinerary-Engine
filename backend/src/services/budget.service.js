const { prisma } = require('../config/database');
const { AppError } = require('../utils/helpers');

const budgetService = {
  // Get trip budgets
  getTripBudgets: async (tripId, userId) => {
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

    const budgets = await prisma.tripBudget.findMany({
      where: { trip_id: tripId },
    });

    // Get total expenses per category
    const expenses = await prisma.expense.findMany({
      where: { trip_id: tripId },
      select: {
        category: true,
        amount: true,
      },
    });

    // Calculate spent per category
    const spentByCategory = expenses.reduce((acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = 0;
      }
      acc[expense.category] += parseFloat(expense.amount);
      return acc;
    }, {});

    // Combine budget with spent
    const budgetsWithSpent = budgets.map(budget => ({
      ...budget,
      spent: spentByCategory[budget.category] || 0,
      remaining: parseFloat(budget.planned_amount) - (spentByCategory[budget.category] || 0),
    }));

    return budgetsWithSpent;
  },

  // Create budget
  createBudget: async (userId, budgetData) => {
    const { trip_id, category, planned_amount, notes } = budgetData;

    // Verify trip ownership
    const trip = await prisma.trip.findUnique({
      where: { id: trip_id },
    });

    if (!trip) {
      throw new AppError('Trip not found', 404);
    }

    if (trip.user_id !== userId) {
      throw new AppError('You do not have permission to modify this trip', 403);
    }

    const budget = await prisma.tripBudget.create({
      data: {
        trip_id,
        category,
        planned_amount,
        notes,
      },
    });

    return budget;
  },

  // Update budget
  updateBudget: async (budgetId, userId, updateData) => {
    const budget = await prisma.tripBudget.findUnique({
      where: { id: budgetId },
      include: { trip: true },
    });

    if (!budget) {
      throw new AppError('Budget not found', 404);
    }

    if (budget.trip.user_id !== userId) {
      throw new AppError('You do not have permission to modify this budget', 403);
    }

    const updatedBudget = await prisma.tripBudget.update({
      where: { id: budgetId },
      data: updateData,
    });

    return updatedBudget;
  },

  // Delete budget
  deleteBudget: async (budgetId, userId) => {
    const budget = await prisma.tripBudget.findUnique({
      where: { id: budgetId },
      include: { trip: true },
    });

    if (!budget) {
      throw new AppError('Budget not found', 404);
    }

    if (budget.trip.user_id !== userId) {
      throw new AppError('You do not have permission to delete this budget', 403);
    }

    await prisma.tripBudget.delete({
      where: { id: budgetId },
    });

    return { message: 'Budget deleted successfully' };
  },
};

module.exports = budgetService;
