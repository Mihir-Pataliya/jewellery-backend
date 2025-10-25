'use strict';
module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define('CartItem', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cartId: {
  type: DataTypes.INTEGER,
  allowNull: false,
},
  productId: {
  type: DataTypes.INTEGER,
  allowNull: false,
 },

    quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
    price: { type: DataTypes.DECIMAL(10,2), allowNull: false }, // Price per unit
    discountAmount: { type: DataTypes.DECIMAL(10,2), defaultValue: 0 },
    status: { type: DataTypes.ENUM('active','removed','purchased'), defaultValue: 'active' },
    createdBy: { type: DataTypes.INTEGER, allowNull: true },
    updatedBy: { type: DataTypes.INTEGER, allowNull: true }
  }, {
    tableName: 'CartItems',
    timestamps: true,
    underscored: true,
  });

  CartItem.associate = function(models) {
    CartItem.belongsTo(models.Cart, { as: 'cart', foreignKey: 'cartId' });
    CartItem.belongsTo(models.Product, { as: 'product', foreignKey: 'productId' });
  
  };

  return CartItem;
};
