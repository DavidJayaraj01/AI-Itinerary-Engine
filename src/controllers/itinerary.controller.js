const itineraryService = require('../services/itinerary.service');

const itineraryController = {
  // GET /api/trips/:tripId/itinerary
  getTripItinerary: async (req, res, next) => {
    try {
      const sections = await itineraryService.getTripItinerary(
        parseInt(req.params.tripId),
        req.user.id
      );

      res.status(200).json({
        success: true,
        count: sections.length,
        data: sections,
      });
    } catch (error) {
      next(error);
    }
  },

  // POST /api/itinerary/sections
  createSection: async (req, res, next) => {
    try {
      const section = await itineraryService.createSection(req.user.id, req.body);

      res.status(201).json({
        success: true,
        data: section,
      });
    } catch (error) {
      next(error);
    }
  },

  // PUT /api/itinerary/sections/:id
  updateSection: async (req, res, next) => {
    try {
      const section = await itineraryService.updateSection(
        parseInt(req.params.id),
        req.user.id,
        req.body
      );

      res.status(200).json({
        success: true,
        data: section,
      });
    } catch (error) {
      next(error);
    }
  },

  // DELETE /api/itinerary/sections/:id
  deleteSection: async (req, res, next) => {
    try {
      const result = await itineraryService.deleteSection(
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

  // POST /api/itinerary/items
  createItem: async (req, res, next) => {
    try {
      const item = await itineraryService.createItem(req.user.id, req.body);

      res.status(201).json({
        success: true,
        data: item,
      });
    } catch (error) {
      next(error);
    }
  },

  // PUT /api/itinerary/items/:id
  updateItem: async (req, res, next) => {
    try {
      const item = await itineraryService.updateItem(
        parseInt(req.params.id),
        req.user.id,
        req.body
      );

      res.status(200).json({
        success: true,
        data: item,
      });
    } catch (error) {
      next(error);
    }
  },

  // DELETE /api/itinerary/items/:id
  deleteItem: async (req, res, next) => {
    try {
      const result = await itineraryService.deleteItem(
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

module.exports = itineraryController;
