'use strict';
module.exports = (sequelize, DataTypes) => {
  const AnalyticsEvent = sequelize.define('AnalyticsEvent', {
    userId: { 
      type: DataTypes.INTEGER,
      allowNull: true
    },
    eventType: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    eventData: { 
      type: DataTypes.JSON,
      allowNull: true
    },
    ipAddress: { 
      type: DataTypes.STRING,
      allowNull: true
    },
    deviceType: { 
      type: DataTypes.STRING,
      allowNull: true
    },
    createdAt: { 
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'AnalyticsEvents',
    timestamps: false
  });

  AnalyticsEvent.associate = function(models) {
    AnalyticsEvent.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return AnalyticsEvent;
};
