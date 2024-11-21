module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('organizers', [
    {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      password: 'hashed_password_1'
    },
    {
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane.smith@example.com',
      role: 'Organizer',
      password: 'hashed_password_2'
    }
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('organizers', null, {})
};