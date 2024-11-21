const express = require('express');
const router = express.Router();
const organizerController = require('../controllers/organizerController');

router.get('/api/organizers', organizerController.getOrganizers);
router.post('/api/organizers', organizerController.createOrganizer);
router.put('/api/organizers/:id', organizerController.updateOrganizer);
router.delete('/api/organizers/:id', organizerController.deleteOrganizer);

module.exports = router;