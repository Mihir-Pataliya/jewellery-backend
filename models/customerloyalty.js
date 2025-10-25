'use strict';
module.exports = (sequelize, DataTypes) => {
  const CustomerLoyalty = sequelize.define('CustomerLoyalty', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    loyaltyProgramId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    lastUpdated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'CustomerLoyalties',
    timestamps: true
  });

  CustomerLoyalty.associate = function(models) {
    CustomerLoyalty.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    CustomerLoyalty.belongsTo(models.LoyaltyProgram, { foreignKey: 'loyaltyProgramId', as: 'program' });
  };

  return CustomerLoyalty;
};
