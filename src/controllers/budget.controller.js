const budgetService = require('../services/budget.service');

const budgetController = {
  // GET /api/trips/:tripId/budgets
  getTripBudgets: async (req, res, next) => {
    try {
      const budgets = await budgetService.getTripBudgets(
        parseInt(req.params.tripId),
        req.user.id
      );

      res.status(200).json({
        success: true,
        count: budgets.length,
        data: budgets,
      });
    } catch (error) {
      next(error);
    }
  },

  // POST /api/budgets
  createBudget: async (req, res, next) => {
    try {
      const budget = await budgetService.createBudget(req.user.id, req.body);

      res.status(201).json({
        success: true,
        data: budget,
      });
    } catch (error) {
      next(error);
    }
  },

  // PUT /api/budgets/:id
  updateBudget: async (req, res, next) => {
    try {
      const budget = await budgetService.updateBudget(
        parseInt(req.params.id),
        req.user.id,
        req.body
      );

      res.status(200).json({
        success: true,
        data: budget,
      });
    } catch (error) {
      next(error);
    }
  },

  // DELETE /api/budgets/:id
  deleteBudget: async (req, res, next) => {
    try {
      const result = await budgetService.deleteBudget(
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

module.exports = budgetController;
