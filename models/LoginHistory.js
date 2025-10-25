'use strict';
module.exports = (sequelize, DataTypes) => {
  const LoginHistory = sequelize.define('LoginHistory', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userAgent: {
      type: DataTypes.STRING,
      allowNull: true
    },
    loginTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'LoginHistories',
    timestamps: false
  });

  LoginHistory.associate = function(models) {
    LoginHistory.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return LoginHistory;
};
