const { prisma } = require('../config/database');
const { AppError } = require('../utils/helpers');

const calendarService = {
  // Get user calendar events
  getUserEvents: async (userId, filters = {}) => {
    const { start_date, end_date, trip_id } = filters;

    const where = { user_id: userId };

    if (trip_id) {
      where.trip_id = parseInt(trip_id);
    }

    if (start_date || end_date) {
      where.start_datetime = {};
      if (start_date) where.start_datetime.gte = new Date(start_date);
      if (end_date) where.start_datetime.lte = new Date(end_date);
    }

    const events = await prisma.calendarEvent.findMany({
      where,
      include: {
        trip: {
          select: {
            id: true,
            title: true,
          },
        },
        itinerary_item: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: { start_datetime: 'asc' },
    });

    return events;
  },

  // Create calendar event
  createEvent: async (userId, eventData) => {
    const { trip_id, itinerary_item_id, title, start_datetime, end_datetime, location, notes } = eventData;

    // Validate dates
    const startDate = new Date(start_datetime);
    const endDate = new Date(end_datetime);

    if (endDate <= startDate) {
      throw new AppError('End datetime must be after start datetime', 400);
    }

    // If trip_id provided, verify access
    if (trip_id) {
      const trip = await prisma.trip.findUnique({
        where: { id: trip_id },
      });

      if (!trip) {
        throw new AppError('Trip not found', 404);
      }

      const hasAccess = trip.user_id === userId || 
        await prisma.userTripLink.findFirst({
          where: { user_id: userId, trip_id },
        });

      if (!hasAccess) {
        throw new AppError('You do not have access to this trip', 403);
      }
    }

    const event = await prisma.calendarEvent.create({
      data: {
        user_id: userId,
        trip_id,
        itinerary_item_id,
        title,
        start_datetime: startDate,
        end_datetime: endDate,
        location,
        notes,
      },
      include: {
        trip: {
          select: {
            id: true,
            title: true,
          },
        },
        itinerary_item: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return event;
  },

  // Update calendar event
  updateEvent: async (eventId, userId, updateData) => {
    const event = await prisma.calendarEvent.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new AppError('Event not found', 404);
    }

    if (event.user_id !== userId) {
      throw new AppError('You do not have permission to update this event', 403);
    }

    // Validate dates if being updated
    if (updateData.start_datetime && updateData.end_datetime) {
      const startDate = new Date(updateData.start_datetime);
      const endDate = new Date(updateData.end_datetime);

      if (endDate <= startDate) {
        throw new AppError('End datetime must be after start datetime', 400);
      }

      updateData.start_datetime = startDate;
      updateData.end_datetime = endDate;
    } else {
      if (updateData.start_datetime) updateData.start_datetime = new Date(updateData.start_datetime);
      if (updateData.end_datetime) updateData.end_datetime = new Date(updateData.end_datetime);
    }

    const updatedEvent = await prisma.calendarEvent.update({
      where: { id: eventId },
      data: updateData,
      include: {
        trip: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return updatedEvent;
  },

  // Delete calendar event
  deleteEvent: async (eventId, userId) => {
    const event = await prisma.calendarEvent.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new AppError('Event not found', 404);
    }

    if (event.user_id !== userId) {
      throw new AppError('You do not have permission to delete this event', 403);
    }

    await prisma.calendarEvent.delete({
      where: { id: eventId },
    });

    return { message: 'Event deleted successfully' };
  },
};

module.exports = calendarService;
