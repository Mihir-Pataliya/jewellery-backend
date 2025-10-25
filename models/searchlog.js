'use strict';
module.exports = (sequelize, DataTypes) => {
  const SearchLog = sequelize.define('SearchLog', {
    userId: { // optional, if user is logged in
      type: DataTypes.INTEGER,
      allowNull: true
    },
    searchQuery: { // the text user searched
      type: DataTypes.STRING,
      allowNull: false
    },
    ipAddress: { // track user IP
      type: DataTypes.STRING,
      allowNull: true
    },
    deviceType: { // mobile, desktop, tablet
      type: DataTypes.STRING,
      allowNull: true
    },
    resultsCount: { // how many products were found
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: 'SearchLogs',
    timestamps: true
  });

  SearchLog.associate = function(models) {
    SearchLog.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return SearchLog;
};
