const Organizer = require('../models/Organizer');
const { Op } = require('sequelize');

exports.getOrganizers = async function(req, res) {
    try {
        const { searchQuery } = req.query;
        let condition = {};
        if (searchQuery) {
            condition = {
                where: {
                    name: {
                        [Op.like]: `%${searchQuery}%`
                    }
                }
            };
        }
        const organizers = await Organizer.findAll(condition);
        res.json(organizers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve organizers' });
    }
};

exports.createOrganizer = async function(req, res) {
    try {
        const { name } = req.body;
        if (!name || name.trim() === '') {
            return res.status(400).json({ error: 'Organizer name is required' });
        }
        const existingOrganizer = await Organizer.findOne({ where: { name } });
        if (existingOrganizer) {
            return res.status(400).json({ error: 'Organizer with this name already exists' });
        }
        const organizer = await Organizer.create({ name });
        res.status(201).json(organizer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create organizer' });
    }
};

exports.updateOrganizer = async function(req, res) {
    try {
        const { id } = req.params;
        const { moduleA, moduleB, moduleC, name } = req.body;
        const organizer = await Organizer.findByPk(id);
        if (!organizer) {
            return res.status(404).json({ error: 'Organizer not found' });
        }
        if (name !== undefined && name.trim() !== '') {
            organizer.name = name;
        }
        if (moduleA !== undefined) {
            organizer.moduleA = moduleA;
        }
        if (moduleB !== undefined) {
            organizer.moduleB = moduleB;
        }
        if (moduleC !== undefined) {
            organizer.moduleC = moduleC;
        }
        await organizer.save();
        res.json(organizer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update organizer' });
    }
};

exports.deleteOrganizer = async function(req, res) {
    try {
        const { id } = req.params;
        const organizer = await Organizer.findByPk(id);
        if (!organizer) {
            return res.status(404).json({ error: 'Organizer not found' });
        }
        await organizer.destroy();
        res.json({ message: 'Organizer deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete organizer' });
    }
};