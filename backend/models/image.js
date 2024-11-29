"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.belongsTo(models.Superhero, {
        foreignKey: "heroId",
        as: "superhero",
        onUpdate: "cascade",
        onDelete: "cascade",
      });
    }
  }

  Image.init(
    {
      image: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "Image cannot be null" },
          notEmpty: { msg: "Image cannot be empty" },
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
    },
    {
      sequelize,
      modelName: "Image",
      tableName: "images",
      underscored: true,
      timestamps: true,
    }
  );

  return Image;
};
