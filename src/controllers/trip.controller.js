const tripService = require('../services/trip.service');

const tripController = {
  // GET /api/trips
  getUserTrips: async (req, res, next) => {
    try {
      const { status } = req.query;
      const trips = await tripService.getUserTrips(req.user.id, { status });

      res.status(200).json({
        success: true,
        count: trips.length,
        data: trips,
      });
    } catch (error) {
      next(error);
    }
  },

  // POST /api/trips
  createTrip: async (req, res, next) => {
    try {
      const trip = await tripService.createTrip(req.user.id, req.body);

      res.status(201).json({
        success: true,
        data: trip,
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/trips/:id
  getTripById: async (req, res, next) => {
    try {
      const trip = await tripService.getTripById(parseInt(req.params.id), req.user.id);

      res.status(200).json({
        success: true,
        data: trip,
      });
    } catch (error) {
      next(error);
    }
  },

  // PUT /api/trips/:id
  updateTrip: async (req, res, next) => {
    try {
      const trip = await tripService.updateTrip(
        parseInt(req.params.id),
        req.user.id,
        req.body
      );

      res.status(200).json({
        success: true,
        data: trip,
      });
    } catch (error) {
      next(error);
    }
  },

  // DELETE /api/trips/:id
  deleteTrip: async (req, res, next) => {
    try {
      const result = await tripService.deleteTrip(parseInt(req.params.id), req.user.id);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  // PATCH /api/trips/:id/status
  updateTripStatus: async (req, res, next) => {
    try {
      const { status } = req.body;
      const trip = await tripService.updateTripStatus(
        parseInt(req.params.id),
        req.user.id,
        status
      );

      res.status(200).json({
        success: true,
        data: trip,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = tripController;
