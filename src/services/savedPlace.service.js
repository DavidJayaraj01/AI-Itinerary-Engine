const { prisma } = require('../config/database');
const { AppError } = require('../utils/helpers');

const savedPlaceService = {
  // Get user's saved places
  getSavedPlaces: async (userId) => {
    const savedPlaces = await prisma.savedPlace.findMany({
      where: { user_id: userId },
      include: {
        activity: {
          include: {
            activity_tags: {
              include: {
                tag: true,
              },
            },
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });

    return savedPlaces;
  },

  // Save a place
  savePlace: async (userId, placeData) => {
    const { activity_id, note } = placeData;

    // Check if activity exists
    const activity = await prisma.activity.findUnique({
      where: { id: activity_id },
    });

    if (!activity) {
      throw new AppError('Activity not found', 404);
    }

    // Check if already saved
    const existing = await prisma.savedPlace.findUnique({
      where: {
        user_id_activity_id: {
          user_id: userId,
          activity_id,
        },
      },
    });

    if (existing) {
      throw new AppError('Place already saved', 400);
    }

    const savedPlace = await prisma.savedPlace.create({
      data: {
        user_id: userId,
        activity_id,
        note,
      },
      include: {
        activity: {
          include: {
            activity_tags: {
              include: {
                tag: true,
              },
            },
          },
        },
      },
    });

    return savedPlace;
  },

  // Remove saved place
  removeSavedPlace: async (savedPlaceId, userId) => {
    const savedPlace = await prisma.savedPlace.findUnique({
      where: { id: savedPlaceId },
    });

    if (!savedPlace) {
      throw new AppError('Saved place not found', 404);
    }

    if (savedPlace.user_id !== userId) {
      throw new AppError('You do not have permission to remove this saved place', 403);
    }

    await prisma.savedPlace.delete({
      where: { id: savedPlaceId },
    });

    return { message: 'Saved place removed successfully' };
  },
};

module.exports = savedPlaceService;
