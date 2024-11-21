const { Model, DataTypes, Sequelize } = require('sequelize');

const sequelize = new Sequelize('attendOne', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
});

class Organizer extends Model {}

Organizer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    moduleA: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    moduleB: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    moduleC: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'organizers',
    tableName: 'organizers',
    timestamps: false,
  }
);

module.exports = Organizer;