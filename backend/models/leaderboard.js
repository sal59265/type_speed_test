'use strict';
const { Model, DataTypes } = require('sequelize');
const { Sequelize, sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
  class LeaderBoard extends Model {
    static associate(models) {
      LeaderBoard.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  LeaderBoard.init(
    {
      leaderBoardId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Leaderboard',
      tableName: 'leaderboards'
    }
  );
  return LeaderBoard;
};
