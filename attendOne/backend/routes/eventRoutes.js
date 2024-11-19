const express = require('express');
const router = express.Router();
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');

router.post('/createEvent', createEvent);
router.get('/events', getEvents);
router.get('/events/:id', getEventById);
router.put('/event/:id', updateEvent);
router.delete('/events/:id', deleteEvent);

module.exports = router;