const analyticsService = require('../services/analytics.service');

const analyticsController = {
  // GET /api/trips/:tripId/stats
  getTripStats: async (req, res, next) => {
    try {
      const stats = await analyticsService.getTripStats(
        parseInt(req.params.tripId),
        req.user.id
      );

      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  },

  // POST /api/trips/:tripId/stats/recalculate
  recalculateTripStats: async (req, res, next) => {
    try {
      const stats = await analyticsService.calculateTripStats(
        parseInt(req.params.tripId),
        req.user.id
      );

      res.status(200).json({
        success: true,
        data: stats,
        message: 'Trip statistics recalculated successfully',
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = analyticsController;
