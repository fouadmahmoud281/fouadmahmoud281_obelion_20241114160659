module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('attendees', [
      {
        first_name: '',
        family_name: '',
        company: '',
        position: '',
        email: '',
        password: '',
        mobile_number: '',
        country: '',
        city: '',
        invitation_type: '',
      },
    ]),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('attendees', null, {}),
};