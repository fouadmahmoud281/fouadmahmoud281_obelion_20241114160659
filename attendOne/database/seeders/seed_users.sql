module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [
    {
      firstName: 'John',
      familyName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      password: 'hashedpassword'
    },
    {
      firstName: 'Jane',
      familyName: 'Smith',
      email: 'jane.smith@example.com',
      phoneNumber: '0987654321',
      password: 'hashedpassword'
    }
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {})
};