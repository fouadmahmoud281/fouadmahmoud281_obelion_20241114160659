const { Model, DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize('sql7745334', 'sql7745334', 'uzVN9Mmcps', {
  host: 'sql7.freesqldatabase.com',
  port: 3306,
  dialect: 'mysql',
});


class User extends Model {
  async comparePassword(password) {
    return await bcrypt.compare(password, this.password);
  }
  static async createTable() {
    try {
      await sequelize.sync({ force: false });
      console.log('Table created successfully.');
    } catch (error) {
      console.error('Error creating table:', error);
    }
  }
}

User.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    familyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);
User.createTable();
module.exports = User;