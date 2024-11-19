const Event = require('../models/Event');

// Create a new event
async function createEvent(req, res) {
  try {
    const { eventName, eventType, eventDate, attendees } = req.body;
    const newEvent = await Event.create({
      eventName,
      eventType,
      eventDate,
      attendees,
    });
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Get all events
async function getEvents(req, res) {
  try {
    const events = await Event.findAll();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get an event by ID
async function getEventById(req, res) {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update an event
async function updateEvent(req, res) {
  try {
    const { id } = req.params;
    const { eventName, eventType, eventDate, attendees } = req.body;
    const event = await Event.findByPk(id);
    if (event) {
      await event.update({ eventName, eventType, eventDate, attendees });
      res.status(200).json(event);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Delete an event
async function deleteEvent(req, res) {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);
    if (event) {
      await event.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};