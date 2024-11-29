"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) =>
    await queryInterface.createTable("superheroes", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nickName: {
        field: "nick_name",
        type: Sequelize.STRING(128),
        allowNull: false,
        unique: true,
      },
      realName: {
        field: "real_name",
        type: Sequelize.STRING(128),
        unique: true,
      },
      originDescription: {
        field: "origin_description",
        type: Sequelize.STRING(500),
        unique: true,
      },
      catchPhrase: {
        field: "catch_phrase",
        type: Sequelize.STRING,
        unique: true,
      },
      createdAt: {
        field: "created_at",
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        field: "updated_at",
        type: Sequelize.DATE,
        allowNull: false,
      },
    }),

  down: async (queryInterface) => await queryInterface.dropTable("superheroes"),
};
