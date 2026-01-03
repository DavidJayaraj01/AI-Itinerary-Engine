const expenseService = require('../services/expense.service');

const expenseController = {
  // GET /api/trips/:tripId/expenses
  getTripExpenses: async (req, res, next) => {
    try {
      const { category, start_date, end_date } = req.query;
      
      const result = await expenseService.getTripExpenses(
        parseInt(req.params.tripId),
        req.user.id,
        { category, start_date, end_date }
      );

      res.status(200).json({
        success: true,
        data: result.expenses,
        summary: result.summary,
      });
    } catch (error) {
      next(error);
    }
  },

  // POST /api/expenses
  createExpense: async (req, res, next) => {
    try {
      const expense = await expenseService.createExpense(req.user.id, req.body);

      res.status(201).json({
        success: true,
        data: expense,
      });
    } catch (error) {
      next(error);
    }
  },

  // PUT /api/expenses/:id
  updateExpense: async (req, res, next) => {
    try {
      const expense = await expenseService.updateExpense(
        parseInt(req.params.id),
        req.user.id,
        req.body
      );

      res.status(200).json({
        success: true,
        data: expense,
      });
    } catch (error) {
      next(error);
    }
  },

  // DELETE /api/expenses/:id
  deleteExpense: async (req, res, next) => {
    try {
      const result = await expenseService.deleteExpense(
        parseInt(req.params.id),
        req.user.id
      );

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = expenseController;
