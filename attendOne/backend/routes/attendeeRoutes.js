const express = require('express');
const router = express.Router();
const {
  createAttendee,
  getAttendees,
  getAttendeeById,
  updateAttendee,
  deleteAttendee,
} = require('../controllers/attendeeController');

router.post('/', createAttendee);
router.get('/', getAttendees);
router.get('/:id', getAttendeeById);
router.put('/:id', updateAttendee);
router.delete('/:id', deleteAttendee);

module.exports = router;