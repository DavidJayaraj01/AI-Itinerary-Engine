const { prisma } = require('../config/database');
const { AppError } = require('../utils/helpers');

const expenseService = {
  // Get trip expenses
  getTripExpenses: async (tripId, userId, filters = {}) => {
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

    const where = { trip_id: tripId };

    if (filters.category) {
      where.category = filters.category;
    }

    if (filters.start_date || filters.end_date) {
      where.expense_date = {};
      if (filters.start_date) where.expense_date.gte = new Date(filters.start_date);
      if (filters.end_date) where.expense_date.lte = new Date(filters.end_date);
    }

    const expenses = await prisma.expense.findMany({
      where,
      include: {
        itinerary_item: {
          select: {
            title: true,
          },
        },
      },
      orderBy: { expense_date: 'desc' },
    });

    // Calculate totals
    const total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    const byCategory = expenses.reduce((acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = 0;
      }
      acc[expense.category] += parseFloat(expense.amount);
      return acc;
    }, {});

    return {
      expenses,
      summary: {
        total,
        count: expenses.length,
        byCategory,
      },
    };
  },

  // Create expense
  createExpense: async (userId, expenseData) => {
    const { trip_id, itinerary_item_id, category, description, amount, currency, expense_date } = expenseData;

    // Verify trip ownership
    const trip = await prisma.trip.findUnique({
      where: { id: trip_id },
    });

    if (!trip) {
      throw new AppError('Trip not found', 404);
    }

    if (trip.user_id !== userId) {
      throw new AppError('You do not have permission to add expenses to this trip', 403);
    }

    const expense = await prisma.expense.create({
      data: {
        trip_id,
        itinerary_item_id,
        category,
        description,
        amount,
        currency: currency || 'USD',
        expense_date: new Date(expense_date),
      },
      include: {
        itinerary_item: {
          select: {
            title: true,
          },
        },
      },
    });

    return expense;
  },

  // Update expense
  updateExpense: async (expenseId, userId, updateData) => {
    const expense = await prisma.expense.findUnique({
      where: { id: expenseId },
      include: { trip: true },
    });

    if (!expense) {
      throw new AppError('Expense not found', 404);
    }

    if (expense.trip.user_id !== userId) {
      throw new AppError('You do not have permission to modify this expense', 403);
    }

    // Convert date if provided
    if (updateData.expense_date) {
      updateData.expense_date = new Date(updateData.expense_date);
    }

    const updatedExpense = await prisma.expense.update({
      where: { id: expenseId },
      data: updateData,
      include: {
        itinerary_item: {
          select: {
            title: true,
          },
        },
      },
    });

    return updatedExpense;
  },

  // Delete expense
  deleteExpense: async (expenseId, userId) => {
    const expense = await prisma.expense.findUnique({
      where: { id: expenseId },
      include: { trip: true },
    });

    if (!expense) {
      throw new AppError('Expense not found', 404);
    }

    if (expense.trip.user_id !== userId) {
      throw new AppError('You do not have permission to delete this expense', 403);
    }

    await prisma.expense.delete({
      where: { id: expenseId },
    });

    return { message: 'Expense deleted successfully' };
  },
};

module.exports = expenseService;
