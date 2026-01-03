const { prisma } = require('../config/database');
const { AppError, hasTimeOverlap } = require('../utils/helpers');

const itineraryService = {
  // Create itinerary section
  createSection: async (userId, sectionData) => {
    const { trip_id, day_number, section_order, title, description, location_name, city, start_time, end_time, estimated_cost, notes } = sectionData;

    // Verify trip ownership/access
    const trip = await prisma.trip.findUnique({
      where: { id: trip_id },
    });

    if (!trip) {
      throw new AppError('Trip not found', 404);
    }

    if (trip.user_id !== userId) {
      throw new AppError('You do not have permission to modify this trip', 403);
    }

    const section = await prisma.itinerarySection.create({
      data: {
        trip_id,
        day_number,
        section_order,
        title,
        description,
        location_name,
        city,
        start_time: start_time ? new Date(start_time) : null,
        end_time: end_time ? new Date(end_time) : null,
        estimated_cost,
        notes,
      },
      include: {
        itinerary_items: true,
      },
    });

    return section;
  },

  // Update itinerary section
  updateSection: async (sectionId, userId, updateData) => {
    const section = await prisma.itinerarySection.findUnique({
      where: { id: sectionId },
      include: { trip: true },
    });

    if (!section) {
      throw new AppError('Section not found', 404);
    }

    if (section.trip.user_id !== userId) {
      throw new AppError('You do not have permission to modify this section', 403);
    }

    // Convert dates if provided
    if (updateData.start_time) {
      updateData.start_time = new Date(updateData.start_time);
    }
    if (updateData.end_time) {
      updateData.end_time = new Date(updateData.end_time);
    }

    const updatedSection = await prisma.itinerarySection.update({
      where: { id: sectionId },
      data: updateData,
      include: {
        itinerary_items: true,
      },
    });

    return updatedSection;
  },

  // Delete itinerary section
  deleteSection: async (sectionId, userId) => {
    const section = await prisma.itinerarySection.findUnique({
      where: { id: sectionId },
      include: { trip: true },
    });

    if (!section) {
      throw new AppError('Section not found', 404);
    }

    if (section.trip.user_id !== userId) {
      throw new AppError('You do not have permission to delete this section', 403);
    }

    await prisma.itinerarySection.delete({
      where: { id: sectionId },
    });

    return { message: 'Section deleted successfully' };
  },

  // Create itinerary item
  createItem: async (userId, itemData) => {
    const { itinerary_section_id, activity_id, title, description, location_name, start_time, end_time, cost, notes } = itemData;

    // Verify section ownership
    const section = await prisma.itinerarySection.findUnique({
      where: { id: itinerary_section_id },
      include: { 
        trip: true,
        itinerary_items: true,
      },
    });

    if (!section) {
      throw new AppError('Itinerary section not found', 404);
    }

    if (section.trip.user_id !== userId) {
      throw new AppError('You do not have permission to modify this itinerary', 403);
    }

    // Check for time overlaps if times are provided
    if (start_time && end_time) {
      const newStart = new Date(start_time);
      const newEnd = new Date(end_time);

      if (newEnd <= newStart) {
        throw new AppError('End time must be after start time', 400);
      }

      // Check existing items for overlaps
      for (const existingItem of section.itinerary_items) {
        if (existingItem.start_time && existingItem.end_time) {
          if (hasTimeOverlap(newStart, newEnd, existingItem.start_time, existingItem.end_time)) {
            throw new AppError('Time overlaps with existing item', 400);
          }
        }
      }
    }

    const item = await prisma.itineraryItem.create({
      data: {
        itinerary_section_id,
        activity_id,
        title,
        description,
        location_name,
        start_time: start_time ? new Date(start_time) : null,
        end_time: end_time ? new Date(end_time) : null,
        cost,
        notes,
      },
      include: {
        activity: true,
      },
    });

    return item;
  },

  // Update itinerary item
  updateItem: async (itemId, userId, updateData) => {
    const item = await prisma.itineraryItem.findUnique({
      where: { id: itemId },
      include: { 
        itinerary_section: { 
          include: { 
            trip: true,
            itinerary_items: true,
          } 
        } 
      },
    });

    if (!item) {
      throw new AppError('Item not found', 404);
    }

    if (item.itinerary_section.trip.user_id !== userId) {
      throw new AppError('You do not have permission to modify this item', 403);
    }

    // Check for time overlaps if updating times
    if (updateData.start_time && updateData.end_time) {
      const newStart = new Date(updateData.start_time);
      const newEnd = new Date(updateData.end_time);

      if (newEnd <= newStart) {
        throw new AppError('End time must be after start time', 400);
      }

      // Check against other items in the same section
      for (const existingItem of item.itinerary_section.itinerary_items) {
        if (existingItem.id !== itemId && existingItem.start_time && existingItem.end_time) {
          if (hasTimeOverlap(newStart, newEnd, existingItem.start_time, existingItem.end_time)) {
            throw new AppError('Time overlaps with existing item', 400);
          }
        }
      }
    }

    // Convert dates
    if (updateData.start_time) updateData.start_time = new Date(updateData.start_time);
    if (updateData.end_time) updateData.end_time = new Date(updateData.end_time);

    const updatedItem = await prisma.itineraryItem.update({
      where: { id: itemId },
      data: updateData,
      include: {
        activity: true,
      },
    });

    return updatedItem;
  },

  // Delete itinerary item
  deleteItem: async (itemId, userId) => {
    const item = await prisma.itineraryItem.findUnique({
      where: { id: itemId },
      include: { itinerary_section: { include: { trip: true } } },
    });

    if (!item) {
      throw new AppError('Item not found', 404);
    }

    if (item.itinerary_section.trip.user_id !== userId) {
      throw new AppError('You do not have permission to delete this item', 403);
    }

    await prisma.itineraryItem.delete({
      where: { id: itemId },
    });

    return { message: 'Item deleted successfully' };
  },

  // Get trip itinerary (all sections and items)
  getTripItinerary: async (tripId, userId) => {
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
    });

    if (!trip) {
      throw new AppError('Trip not found', 404);
    }

    // Check access
    const hasAccess = trip.user_id === userId || 
      await prisma.userTripLink.findFirst({
        where: { user_id: userId, trip_id: tripId },
      });

    if (!hasAccess) {
      throw new AppError('You do not have access to this trip', 403);
    }

    const sections = await prisma.itinerarySection.findMany({
      where: { trip_id: tripId },
      include: {
        itinerary_items: {
          orderBy: { start_time: 'asc' },
          include: {
            activity: true,
          },
        },
      },
      orderBy: [
        { day_number: 'asc' },
        { section_order: 'asc' },
      ],
    });

    return sections;
  },
};

module.exports = itineraryService;
