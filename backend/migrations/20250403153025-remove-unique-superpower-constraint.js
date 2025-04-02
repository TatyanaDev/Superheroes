"use strict";

module.exports = {
  up: async (queryInterface) =>
    await queryInterface.removeConstraint(
      "superpowers",
      "superpowers_superpower_key"
    ),

  down: async (queryInterface) =>
    await queryInterface.addConstraint("superpowers", {
      fields: ["superpower"],
      type: "unique",
      name: "superpowers_superpower_key",
    }),
};
