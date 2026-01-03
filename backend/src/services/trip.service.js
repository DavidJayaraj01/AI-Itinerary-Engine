const { prisma } = require('../config/database');
const { AppError, calculateDaysBetween } = require('../utils/helpers');

const tripService = {
  // Get all trips for a user
  getUserTrips: async (userId, filters = {}) => {
    const where = { user_id: userId };

    if (filters.status) {
      where.status = filters.status;
    }

    const trips = await prisma.trip.findMany({
      where,
      include: {
        trip_stats: true,
        _count: {
          select: {
            itinerary_sections: true,
            expenses: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });

    return trips;
  },

  // Create new trip
  createTrip: async (userId, tripData) => {
    const { title, description, start_date, end_date, total_budget } = tripData;

    // Validate dates
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    if (endDate < startDate) {
      throw new AppError('End date must be after start date', 400);
    }

    const trip = await prisma.trip.create({
      data: {
        user_id: userId,
        title,
        description,
        start_date: startDate,
        end_date: endDate,
        total_budget,
        status: 'planning',
      },
      include: {
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
      },
    });

    // Create user trip link as owner
    await prisma.userTripLink.create({
      data: {
        user_id: userId,
        trip_id: trip.id,
        relation_type: 'owner',
      },
    });

    return trip;
  },

  // Get trip by ID
  getTripById: async (tripId, userId) => {
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: {
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            avatar_url: true,
          },
        },
        itinerary_sections: {
          orderBy: [{ day_number: 'asc' }, { section_order: 'asc' }],
          include: {
            itinerary_items: {
              orderBy: { start_time: 'asc' },
              include: {
                activity: true,
              },
            },
          },
        },
        trip_budgets: true,
        trip_stats: true,
        _count: {
          select: {
            expenses: true,
          },
        },
      },
    });

    if (!trip) {
      throw new AppError('Trip not found', 404);
    }

    // Check if user has access to this trip
    const hasAccess = trip.user_id === userId || 
      await prisma.userTripLink.findFirst({
        where: {
          user_id: userId,
          trip_id: tripId,
        },
      });

    if (!hasAccess) {
      throw new AppError('You do not have access to this trip', 403);
    }

    return trip;
  },

  // Update trip
  updateTrip: async (tripId, userId, updateData) => {
    // Check ownership
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
    });

    if (!trip) {
      throw new AppError('Trip not found', 404);
    }

    if (trip.user_id !== userId) {
      throw new AppError('You do not have permission to update this trip', 403);
    }

    // Validate dates if being updated
    if (updateData.start_date && updateData.end_date) {
      const startDate = new Date(updateData.start_date);
      const endDate = new Date(updateData.end_date);

      if (endDate < startDate) {
        throw new AppError('End date must be after start date', 400);
      }
    }

    const updatedTrip = await prisma.trip.update({
      where: { id: tripId },
      data: updateData,
      include: {
        trip_stats: true,
      },
    });

    return updatedTrip;
  },

  // Delete trip
  deleteTrip: async (tripId, userId) => {
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
    });

    if (!trip) {
      throw new AppError('Trip not found', 404);
    }

    if (trip.user_id !== userId) {
      throw new AppError('You do not have permission to delete this trip', 403);
    }

    await prisma.trip.delete({
      where: { id: tripId },
    });

    return { message: 'Trip deleted successfully' };
  },

  // Update trip status
  updateTripStatus: async (tripId, userId, status) => {
    const validStatuses = ['planning', 'confirmed', 'ongoing', 'completed', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      throw new AppError(`Invalid status. Must be one of: ${validStatuses.join(', ')}`, 400);
    }

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
    });

    if (!trip) {
      throw new AppError('Trip not found', 404);
    }

    if (trip.user_id !== userId) {
      throw new AppError('You do not have permission to update this trip', 403);
    }

    const updatedTrip = await prisma.trip.update({
      where: { id: tripId },
      data: { status },
    });

    return updatedTrip;
  },
};

module.exports = tripService;
