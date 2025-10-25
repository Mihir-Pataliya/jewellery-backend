'use strict';
module.exports = (sequelize, DataTypes) => {
  const LoyaltyProgram = sequelize.define('LoyaltyProgram', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'expired'),
      defaultValue: 'active'
    },
    pointsPerCurrency: {
      type: DataTypes.DECIMAL(10,2),
      defaultValue: 1
    },
    maxPointsPerOrder: { 
      type: DataTypes.INTEGER,
      allowNull: true
    },
    redemptionRate: {
      type: DataTypes.DECIMAL(10,2),
      defaultValue: 1
    }
  }, {
    tableName: 'LoyaltyPrograms',
    timestamps: true
  });

  LoyaltyProgram.associate = function(models) {
  
    LoyaltyProgram.hasMany(models.CustomerLoyalty, { foreignKey: 'loyaltyProgramId', as: 'customers' });

    LoyaltyProgram.hasMany(models.LoyaltyTransaction, { foreignKey: 'loyaltyProgramId', as: 'transactions' });
  };

  return LoyaltyProgram;
};
