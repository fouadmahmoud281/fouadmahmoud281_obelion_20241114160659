module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.bulkInsert(
      'organizers', 
      [
        // Add seeder data here if needed
      ]
    ),
  down: (queryInterface, Sequelize) => 
    queryInterface.bulkDelete('organizers', null, {})
};