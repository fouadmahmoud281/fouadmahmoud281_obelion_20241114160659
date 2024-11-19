module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('suppliers', [
    { name: 'Supplier1', contactInfo: 'Contact1' },
    { name: 'Supplier2', contactInfo: 'Contact2' }
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('suppliers', null, {})
};