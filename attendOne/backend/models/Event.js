const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('attendOne', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
});

class Event extends Model {}

Event.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  eventName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        notEmpty: true,
    },
  },
  eventType: {
    type: DataTypes.ENUM('conference', 'seminar', 'webinar'),
    allowNull: false,
  },
  eventDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
        isDate: true,
    },
  },
  attendees: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
        isInt: true,
        min: 1,
    },
  },
  venue_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'venues',
      key: 'id',
    }
  },
  supplier_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'suppliers',
      key: 'id',
    }
  }
}, {
  sequelize,
  modelName: 'Event',
  tableName: 'events',
  timestamps: false,
});

module.exports = Event;