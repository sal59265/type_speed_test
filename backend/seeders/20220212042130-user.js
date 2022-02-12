'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user', [
      {
        userId: 1,
        name: 'soul',
        password: 'soul',
        email: 'soul@gmail.com',
        wpm: 0,
        accuracy: 0
      },
      {
        userId: 2,
        name: 'rob',
        password: 'rob',
        email: 'rob@gmail.com',
        wpm: 0,
        accuracy: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        name: 'vlad',
        password: 'vlad',
        email: 'vlad@gmail.com',
        wpm: 0,
        accuracy: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        name: 'marvel',
        password: 'marvel',
        email: 'marvel@gmail.com',
        wpm: 0,
        accuracy: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {});
  }
};
