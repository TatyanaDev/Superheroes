"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Superhero extends Model {
    static associate(models) {
      Superhero.hasMany(models.Superpower, {
        foreignKey: "heroId",
        onUpdate: "cascade",
        onDelete: "cascade",
      });
      Superhero.hasMany(models.Image, {
        foreignKey: "heroId",
        onUpdate: "cascade",
        onDelete: "cascade",
      });
    }
  }
  Superhero.init(
    {
      nickName: {
        field: "nick_name",
        unique: true,
        allowNull: false,
        type: DataTypes.STRING(128),
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      realName: {
        field: "real_name",
        unique: true,
        type: DataTypes.STRING(128),
      },
      originDescription: {
        field: "origin_description",
        unique: true,
        type: DataTypes.STRING(500),
      },
      catchPhrase: {
        field: "catch_phrase",
        unique: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Superhero",
      tableName: "superheroes",
      underscored: true,
    }
  );

  return Superhero;
};
