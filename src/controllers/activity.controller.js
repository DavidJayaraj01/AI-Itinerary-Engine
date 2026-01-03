const activityService = require('../services/activity.service');

const activityController = {
  // GET /api/activities
  searchActivities: async (req, res, next) => {
    try {
      const { city, country, category, tags, search, limit, offset } = req.query;

      const filters = {
        city,
        country,
        category,
        tags: tags ? (Array.isArray(tags) ? tags : [tags]) : undefined,
        search,
        limit,
        offset,
      };

      const result = await activityService.searchActivities(filters);

      res.status(200).json({
        success: true,
        data: result.activities,
        pagination: {
          total: result.total,
          limit: result.limit,
          offset: result.offset,
          hasMore: result.offset + result.limit < result.total,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/activities/:id
  getActivityById: async (req, res, next) => {
    try {
      const activity = await activityService.getActivityById(parseInt(req.params.id));

      res.status(200).json({
        success: true,
        data: activity,
      });
    } catch (error) {
      next(error);
    }
  },

  // POST /api/activities
  createActivity: async (req, res, next) => {
    try {
      const activity = await activityService.createActivity(req.body);

      res.status(201).json({
        success: true,
        data: activity,
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/activities/tags
  getAllTags: async (req, res, next) => {
    try {
      const tags = await activityService.getAllTags();

      res.status(200).json({
        success: true,
        count: tags.length,
        data: tags,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = activityController;
