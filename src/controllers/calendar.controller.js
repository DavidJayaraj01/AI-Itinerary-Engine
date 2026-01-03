const calendarService = require('../services/calendar.service');

const calendarController = {
  // GET /api/calendar/events
  getUserEvents: async (req, res, next) => {
    try {
      const { start_date, end_date, trip_id } = req.query;

      const events = await calendarService.getUserEvents(req.user.id, {
        start_date,
        end_date,
        trip_id,
      });

      res.status(200).json({
        success: true,
        count: events.length,
        data: events,
      });
    } catch (error) {
      next(error);
    }
  },

  // POST /api/calendar/events
  createEvent: async (req, res, next) => {
    try {
      const event = await calendarService.createEvent(req.user.id, req.body);

      res.status(201).json({
        success: true,
        data: event,
      });
    } catch (error) {
      next(error);
    }
  },

  // PUT /api/calendar/events/:id
  updateEvent: async (req, res, next) => {
    try {
      const event = await calendarService.updateEvent(
        parseInt(req.params.id),
        req.user.id,
        req.body
      );

      res.status(200).json({
        success: true,
        data: event,
      });
    } catch (error) {
      next(error);
    }
  },

  // DELETE /api/calendar/events/:id
  deleteEvent: async (req, res, next) => {
    try {
      const result = await calendarService.deleteEvent(
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

module.exports = calendarController;
