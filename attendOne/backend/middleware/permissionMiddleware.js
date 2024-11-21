const Organizer = require('../models/Organizer');

function checkModulePermission(moduleName) {
  return async function(req, res, next) {
    try {
      const organizerId = req.userId; // Assuming organizer ID is set in req.userId
      if (!organizerId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const organizer = await Organizer.findByPk(organizerId);
      if (!organizer) {
        return res.status(404).json({ error: 'Organizer not found' });
      }

      if (organizer[moduleName]) {
        next();
      } else {
        res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Permission check failed' });
    }
  };
}

module.exports = {
  checkModulePermission,
};