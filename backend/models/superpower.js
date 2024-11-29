"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Superpower extends Model {
    static associate(models) {
      Superpower.belongsTo(models.Superhero, {
        foreignKey: "heroId",
        as: "superhero",
        onUpdate: "cascade",
        onDelete: "cascade",
      });
    }
  }

  Superpower.init(
    {
      superpower: {
        type: DataTypes.STRING(500),
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Superpower cannot be null" },
          notEmpty: { msg: "Superpower cannot be empty" },
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
    },
    {
      sequelize,
      modelName: "Superpower",
      tableName: "superpowers",
      underscored: true,
      timestamps: true,
    }
  );

  return Superpower;
};
