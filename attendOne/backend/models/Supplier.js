const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Supplier extends Model {}

  Supplier.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    service_type: {
      type: DataTypes.STRING(255)
    },
    contact_info: {
      type: DataTypes.STRING(255)
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1)
    }
  }, {
    sequelize,
    modelName: 'Supplier',
    tableName: 'suppliers',
    timestamps: false
  });

  return Supplier;
};