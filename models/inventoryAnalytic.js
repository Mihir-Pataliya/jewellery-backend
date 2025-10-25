'use strict';
module.exports = (sequelize, DataTypes) => {
  const InventoryAnalytics = sequelize.define('InventoryAnalytics', {
    productId: { type: DataTypes.INTEGER, allowNull: false },
    storeId: { type: DataTypes.INTEGER, allowNull: true },
    openingStock: { type: DataTypes.INTEGER, defaultValue: 0 },
    purchasedQty: { type: DataTypes.INTEGER, defaultValue: 0 },
    soldQty: { type: DataTypes.INTEGER, defaultValue: 0 },
    closingStock: { type: DataTypes.INTEGER, defaultValue: 0 },
    periodStart: { type: DataTypes.DATE, allowNull: false },
    periodEnd: { type: DataTypes.DATE, allowNull: false }
  }, {
    tableName: 'InventoryAnalytics',
    timestamps: true
  });

  InventoryAnalytics.associate = function(models) {
    InventoryAnalytics.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
    InventoryAnalytics.belongsTo(models.Store, { foreignKey: 'storeId', as: 'store' });
  };

  return InventoryAnalytics;
};
