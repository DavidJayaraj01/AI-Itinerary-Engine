const cityService = require('../services/city.service');

const cityController = {
  // GET /api/cities/search?q=query
  searchCities: async (req, res, next) => {
    try {
      const { q } = req.query;
      
      if (!q || q.trim().length < 2) {
        return res.status(200).json({
          success: true,
          data: []
        });
      }

      const cities = await cityService.searchCities(q, 20);

      res.status(200).json({
        success: true,
        data: cities
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = cityController;
