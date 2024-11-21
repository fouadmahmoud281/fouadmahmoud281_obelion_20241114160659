const { Model, DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize('attendOne', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
});

class Organizer extends Model {}

Organizer.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notNull: { msg: 'First Name is required' },
      notEmpty: { msg: 'First Name should not be empty' },
    },
  },
  last_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notNull: { msg: 'Last Name is required' },
      notEmpty: { msg: 'Last Name should not be empty' },
    },
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: { msg: 'Email must be valid' },
      notNull: { msg: 'Email is required' },
      notEmpty: { msg: 'Email should not be empty' },
    },
  },
  role: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notNull: { msg: 'Role is required' },
      notEmpty: { msg: 'Role should not be empty' },
    },
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notNull: { msg: 'Password is required' },
      notEmpty: { msg: 'Password should not be empty' },
    },
  },
}, {
  sequelize,
  modelName: 'Organizer',
  tableName: 'organizers',
  timestamps: false,
  hooks: {
    beforeCreate: async (organizer, options) => {
      if (organizer.password) {
        const salt = await bcrypt.genSalt(10);
        organizer.password = await bcrypt.hash(organizer.password, salt);
      }
    },
    beforeUpdate: async (organizer, options) => {
      if (organizer.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        organizer.password = await bcrypt.hash(organizer.password, salt);
      }
    },
  },
});

module.exports = Organizer;