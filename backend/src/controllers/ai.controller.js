const aiService = require('../services/ai.service');

const aiController = {
  // POST /api/ai/generate-itinerary
  generateItinerary: async (req, res, next) => {
    try {
      const result = await aiService.generateItinerary(req.user.id, req.body);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  // POST /api/ai/optimize-budget
  optimizeBudget: async (req, res, next) => {
    try {
      const result = await aiService.optimizeBudget(req.user.id, req.body);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  // POST /api/ai/trip-summary
  generateTripSummary: async (req, res, next) => {
    try {
      const result = await aiService.generateTripSummary(req.user.id, req.body);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = aiController;
