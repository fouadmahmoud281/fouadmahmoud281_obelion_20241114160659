module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('venues', []),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('venues', null, {})
};