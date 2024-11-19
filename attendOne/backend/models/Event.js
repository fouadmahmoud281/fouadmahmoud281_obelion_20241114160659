const { Sequelize, DataTypes, Model } = require('sequelize');
const Supplier = require('./Supplier');
const Venue = require('./Venue');

const sequelize = new Sequelize('sql7745334', 'sql7745334', 'uzVN9Mmcps', {
  host: 'sql7.freesqldatabase.com',
  port: 3306,
  dialect: 'mysql',
});

class Event extends Model {
  static async createTable() {
    try {
      // Create tables for Supplier and Venue models
      const supplierModel = Supplier(sequelize);
      const venueModel = Venue(sequelize);

      await supplierModel.sync({ force: false });
      await venueModel.sync({ force: false });

      // Create table for Event model
      await Event.sync({ force: false });

      console.log('Tables created successfully.');
    } catch (error) {
      console.error('Error creating tables:', error);
    }
  }
}

Event.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
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
  attendees: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    validate: {
        isInt: true,
        min: 1,
    },
  },
  eventStartDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
        isDate: true,
    },
  },
  eventEndDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
        isDate: true,
    },
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        notEmpty: true,
    },
  },
  venue_type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        notEmpty: true,
    },
  },
  amenities: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        notEmpty: true,
    },
  },
  preferred_cuisine: {
    type: DataTypes.ENUM('italian', 'chinese', 'japanese', 'indian'),
    allowNull: false,
  },
  service_type: {
    type: DataTypes.ENUM('photography', 'audio_visual', 'decoration'),
    allowNull: false,
  },
  maximum_budget: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isNumeric: true,
      min: 0,
    },
  },
  venue_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
    references: {
      model: 'venues',
      key: 'id',
    }
  },
  supplier_id: {
    type: DataTypes.INTEGER.UNSIGNED,
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

Event.createTable()

module.exports = Event;