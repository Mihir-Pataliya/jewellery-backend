'use strict';
module.exports = (sequelize, DataTypes) => {
  const LoyaltyTransaction = sequelize.define('LoyaltyTransaction', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    loyaltyProgramId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    orderId: {   
      type: DataTypes.INTEGER,
      allowNull: true
    },
    points: {    
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {    
      type: DataTypes.ENUM('earn','redeem'),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'LoyaltyTransactions',
    timestamps: true
  });

  LoyaltyTransaction.associate = function(models) {
    LoyaltyTransaction.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    LoyaltyTransaction.belongsTo(models.LoyaltyProgram, { foreignKey: 'loyaltyProgramId', as: 'program' });
    LoyaltyTransaction.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
  };

  return LoyaltyTransaction;
};
