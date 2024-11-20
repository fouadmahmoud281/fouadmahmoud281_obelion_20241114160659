const Attendee = require('../models/Attendee');

const createAttendee = async (req, res) => {
  try {
    const {
      first_name,
      family_name,
      company,
      position,
      email,
      password,
      mobile_number,
      country,
      city,
      invitation_type,
    } = req.body;

    const attendee = await Attendee.create({
      first_name,
      family_name,
      company,
      position,
      email,
      password,
      mobile_number,
      country,
      city,
      invitation_type,
    });

    res.status(201).json(attendee);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create attendee' });
  }
};

const getAttendees = async (req, res) => {
  try {
    const attendees = await Attendee.findAll();
    res.status(200).json(attendees);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve attendees' });
  }
};

const getAttendeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const attendee = await Attendee.findByPk(id);

    if (!attendee) {
      return res.status(404).json({ error: 'Attendee not found' });
    }

    res.status(200).json(attendee);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve attendee' });
  }
};

const updateAttendee = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      family_name,
      company,
      position,
      email,
      password,
      mobile_number,
      country,
      city,
      invitation_type,
    } = req.body;

    const attendee = await Attendee.findByPk(id);

    if (!attendee) {
      return res.status(404).json({ error: 'Attendee not found' });
    }

    await attendee.update({
      first_name,
      family_name,
      company,
      position,
      email,
      password,
      mobile_number,
      country,
      city,
      invitation_type,
    });

    res.status(200).json(attendee);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update attendee' });
  }
};

const deleteAttendee = async (req, res) => {
  try {
    const { id } = req.params;

    const attendee = await Attendee.findByPk(id);

    if (!attendee) {
      return res.status(404).json({ error: 'Attendee not found' });
    }

    await attendee.destroy();

    res.status(200).json({ message: 'Attendee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete attendee' });
  }
};

module.exports = {
  createAttendee,
  getAttendees,
  getAttendeeById,
  updateAttendee,
  deleteAttendee,
};