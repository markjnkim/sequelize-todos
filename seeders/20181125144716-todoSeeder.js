'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Todos', [{
      name: '測試 A',
      done: false,
      createdAt : new Date(),
      updatedAt : new Date(),
    }, {
      name: '測試 B',
      done: true,
      createdAt : new Date(),
      updatedAt : new Date(),
    }, {
      name: '測試 C',
      done: false,
      createdAt : new Date(),
      updatedAt : new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
