const { Model, DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize('attendOne', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
});

class Attendee extends Model {
  validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

Attendee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    family_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    company: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    position: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    mobile_number: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    invitation_type: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'attendees',
    tableName: 'attendees',
    timestamps: false,
    hooks: {
      beforeCreate: async (attendee) => {
        if (attendee.password) {
          const salt = await bcrypt.genSalt(10);
          attendee.password = await bcrypt.hash(attendee.password, salt);
        }
      },
      beforeUpdate: async (attendee) => {
        if (attendee.password && attendee.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          attendee.password = await bcrypt.hash(attendee.password, salt);
        }
      },
    },
  }
);

module.exports = Attendee;