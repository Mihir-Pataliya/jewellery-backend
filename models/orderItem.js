'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    variantId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    unitPrice: {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false
    },
    totalPrice: {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false
    },
    discountAmount: {
      type: DataTypes.DECIMAL(12,2),
      defaultValue: 0
    },
    taxAmount: {
      type: DataTypes.DECIMAL(12,2),
      defaultValue: 0
    },
    status: {
      type: DataTypes.ENUM('pending','shipped','delivered','cancelled','returned'),
      defaultValue: 'pending'
    }
  }, {
    tableName: 'OrderItems',
    timestamps: true,
    underscored: true
  });

  OrderItem.associate = function(models) {
    OrderItem.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
    OrderItem.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
    OrderItem.belongsTo(models.Variant, { foreignKey: 'variantId', as: 'variant' });
  };

  return OrderItem;
};
