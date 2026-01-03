const { prisma } = require('../config/database');
const { AppError } = require('../utils/helpers');

const activityService = {
  // Search activities with filters
  searchActivities: async (filters = {}) => {
    const { city, country, category, tags, search, limit = 50, offset = 0 } = filters;

    const where = {};

    if (city) where.city = { contains: city, mode: 'insensitive' };
    if (country) where.country = { contains: country, mode: 'insensitive' };
    if (category) where.category = category;
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Tag filtering
    if (tags && tags.length > 0) {
      where.activity_tags = {
        some: {
          tag: {
            name: { in: tags },
          },
        },
      };
    }

    const [activities, total] = await Promise.all([
      prisma.activity.findMany({
        where,
        include: {
          activity_tags: {
            include: {
              tag: true,
            },
          },
        },
        take: parseInt(limit),
        skip: parseInt(offset),
        orderBy: { rating: 'desc' },
      }),
      prisma.activity.count({ where }),
    ]);

    return { activities, total, limit: parseInt(limit), offset: parseInt(offset) };
  },

  // Get activity by ID
  getActivityById: async (activityId) => {
    const activity = await prisma.activity.findUnique({
      where: { id: activityId },
      include: {
        activity_tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!activity) {
      throw new AppError('Activity not found', 404);
    }

    return activity;
  },

  // Create activity (admin/system use)
  createActivity: async (activityData) => {
    const { name, city, country, category, description, address, latitude, longitude, avg_duration_minutes, avg_cost, rating, tags } = activityData;

    const activity = await prisma.activity.create({
      data: {
        name,
        city,
        country,
        category,
        description,
        address,
        latitude,
        longitude,
        avg_duration_minutes,
        avg_cost,
        rating,
      },
    });

    // Add tags if provided
    if (tags && tags.length > 0) {
      for (const tagName of tags) {
        // Find or create tag
        let tag = await prisma.activityTag.findFirst({
          where: { name: tagName },
        });

        if (!tag) {
          tag = await prisma.activityTag.create({
            data: { name: tagName },
          });
        }

        // Create mapping
        await prisma.activityTagMap.create({
          data: {
            activity_id: activity.id,
            tag_id: tag.id,
          },
        });
      }
    }

    return this.getActivityById(activity.id);
  },

  // Get all tags
  getAllTags: async () => {
    const tags = await prisma.activityTag.findMany({
      include: {
        _count: {
          select: {
            activities: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    });

    return tags;
  },
};

module.exports = activityService;
