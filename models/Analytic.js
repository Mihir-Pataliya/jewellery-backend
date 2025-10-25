'use strict';
module.exports = (sequelize, DataTypes) => {
  const RevenueAnalytics = sequelize.define('RevenueAnalytics', {
    productId: { type: DataTypes.INTEGER, allowNull: true },
    storeId: { type: DataTypes.INTEGER, allowNull: true },
    totalRevenue: { type: DataTypes.DECIMAL(12,2), defaultValue: 0 },
    totalOrders: { type: DataTypes.INTEGER, defaultValue: 0 },
    periodStart: { type: DataTypes.DATE, allowNull: false },
    periodEnd: { type: DataTypes.DATE, allowNull: false }
  }, {
    tableName: 'RevenueAnalytics',
    timestamps: true
  });

  RevenueAnalytics.associate = function(models) {
    RevenueAnalytics.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
    RevenueAnalytics.belongsTo(models.Store, { foreignKey: 'storeId', as: 'store' });
  };

  return RevenueAnalytics;
};
