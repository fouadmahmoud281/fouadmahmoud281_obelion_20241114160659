const Organizer = require('../models/Organizer');

const createOrganizer = async (req, res) => {
    try {
        const { first_name, last_name, email, role, password } = req.body;
        if (!first_name || !last_name || !email || !role || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const existingOrganizer = await Organizer.findOne({ where: { email } });
        if (existingOrganizer) {
            return res.status(409).json({ error: 'Email already exists' });
        }
        const organizer = await Organizer.create({
            first_name,
            last_name,
            email,
            role,
            password,
        });
        return res.status(201).json(organizer);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
};

const getOrganizers = async (req, res) => {
    try {
        const organizers = await Organizer.findAll();
        return res.status(200).json(organizers);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
};

const getOrganizerById = async (req, res) => {
    try {
        const { id } = req.params;
        const organizer = await Organizer.findByPk(id);
        if (!organizer) {
            return res.status(404).json({ error: 'Organizer not found' });
        }
        return res.status(200).json(organizer);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
};

const updateOrganizer = async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, email, role, password } = req.body;
        const organizer = await Organizer.findByPk(id);
        if (!organizer) {
            return res.status(404).json({ error: 'Organizer not found' });
        }
        await organizer.update({
            first_name,
            last_name,
            email,
            role,
            password,
        });
        return res.status(200).json(organizer);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
};

const deleteOrganizer = async (req, res) => {
    try {
        const { id } = req.params;
        const organizer = await Organizer.findByPk(id);
        if (!organizer) {
            return res.status(404).json({ error: 'Organizer not found' });
        }
        await organizer.destroy();
        return res.status(200).json({ message: 'Organizer deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
};

module.exports = {
    createOrganizer,
    getOrganizers,
    getOrganizerById,
    updateOrganizer,
    deleteOrganizer,
};