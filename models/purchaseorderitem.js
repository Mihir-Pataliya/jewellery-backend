'use strict';
module.exports = (sequelize, DataTypes) => {
  const PurchaseOrderItem = sequelize.define('PurchaseOrderItem', {
    purchaseOrderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    costPrice: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    }
  }, {
    tableName: 'PurchaseOrderItems',
    timestamps: true
  });

  PurchaseOrderItem.associate = function(models) {
    PurchaseOrderItem.belongsTo(models.PurchaseOrder, { foreignKey: 'purchaseOrderId', as: 'purchaseOrder' });
    PurchaseOrderItem.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
  };

  return PurchaseOrderItem;
};
