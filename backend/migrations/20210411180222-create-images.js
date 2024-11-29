"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) =>
    await queryInterface.createTable("images", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      heroId: {
        field: "hero_id",
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "superheroes",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      image: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
        onDelete: "cascade",
        onUpdate: "cascade",
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

  down: async (queryInterface) => await queryInterface.dropTable("images"),
};
