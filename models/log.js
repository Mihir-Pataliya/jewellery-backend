'use strict';
module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {
    userId: { type: DataTypes.INTEGER, allowNull: true },
    actionType: { 
      type: DataTypes.ENUM('login','logout','create','update','delete','purchase','stock_change','coupon_apply'), 
      allowNull: false 
    },
    tableName: { type: DataTypes.STRING, allowNull: false },
    recordId: { type: DataTypes.INTEGER, allowNull: true },
    oldValue: DataTypes.TEXT,
    newValue: DataTypes.TEXT,
    ipAddress: DataTypes.STRING,
    device: DataTypes.STRING,
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'Logs',
    timestamps: false
  });

  Log.associate = function(models) {
    Log.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Log;
};
