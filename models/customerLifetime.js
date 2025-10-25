'use strict';
module.exports = (sequelize, DataTypes) => {
  const CustomerLifetimeValue = sequelize.define('CustomerLifetimeValue', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    totalOrders: { type: DataTypes.INTEGER, defaultValue: 0 },
    totalSpent: { type: DataTypes.DECIMAL(12,2), defaultValue: 0 },
    avgOrderValue: { type: DataTypes.DECIMAL(12,2), defaultValue: 0 },
    firstPurchaseDate: { type: DataTypes.DATE, allowNull: true },
    lastPurchaseDate: { type: DataTypes.DATE, allowNull: true }
  }, {
    tableName: 'CustomerLifetimeValue',
    timestamps: true
  });

  CustomerLifetimeValue.associate = function(models) {
    CustomerLifetimeValue.belongsTo(models.User, { foreignKey: 'userId', as: 'customer' });
  };

  return CustomerLifetimeValue;
};
