"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Superhero extends Model {
    static associate(models) {
      Superhero.hasMany(models.Superpower, {
        foreignKey: "heroId",
        as: "superpowers",
        onUpdate: "cascade",
        onDelete: "cascade",
      });
      Superhero.hasMany(models.Image, {
        foreignKey: "heroId",
        as: "images",
        onUpdate: "cascade",
        onDelete: "cascade",
      });
    }
  }

  Superhero.init(
    {
      nickName: {
        field: "nick_name",
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Nickname cannot be null" },
          notEmpty: { msg: "Nickname cannot be empty" },
        },
      },
      realName: {
        field: "real_name",
        type: DataTypes.STRING(128),
        unique: true,
      },
      originDescription: {
        field: "origin_description",
        type: DataTypes.STRING(500),
        unique: true,
      },
      catchPhrase: {
        field: "catch_phrase",
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Superhero",
      tableName: "superheroes",
      underscored: true,
      timestamps: true,
    }
  );

  return Superhero;
};
