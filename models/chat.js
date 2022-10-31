"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Chat.init(
    {
      chatId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: DataTypes.STRING,
      message: DataTypes.STRING,
      room: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Chat",
    }
  );
  return Chat;
};
