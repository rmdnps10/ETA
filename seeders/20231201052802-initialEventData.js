'use strict';

/** @type {import('sequelize-cli').Migration} */

const initialEventData = require("../src/InitialEventData");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Events", initialEventData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Events", null, {});
  }
};
