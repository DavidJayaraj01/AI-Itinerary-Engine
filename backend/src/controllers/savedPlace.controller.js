const savedPlaceService = require('../services/savedPlace.service');

const savedPlaceController = {
  // GET /api/saved-places
  getSavedPlaces: async (req, res, next) => {
    try {
      const savedPlaces = await savedPlaceService.getSavedPlaces(req.user.id);

      res.status(200).json({
        success: true,
        count: savedPlaces.length,
        data: savedPlaces,
      });
    } catch (error) {
      next(error);
    }
  },

  // POST /api/saved-places
  savePlace: async (req, res, next) => {
    try {
      const savedPlace = await savedPlaceService.savePlace(req.user.id, req.body);

      res.status(201).json({
        success: true,
        data: savedPlace,
      });
    } catch (error) {
      next(error);
    }
  },

  // DELETE /api/saved-places/:id
  removeSavedPlace: async (req, res, next) => {
    try {
      const result = await savedPlaceService.removeSavedPlace(
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

module.exports = savedPlaceController;
