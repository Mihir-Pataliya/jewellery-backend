'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderPromo = sequelize.define('OrderPromo', {
    orderId: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    couponId: { // link to coupon used
      type: DataTypes.INTEGER,
      allowNull: true
    },
    promoCode: { // code entered by customer
      type: DataTypes.STRING,
      allowNull: false
    },
    discountAmount: { // how much discount applied
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      defaultValue: 0
    },
    status: { 
      type: DataTypes.ENUM('applied','expired','canceled'),
      defaultValue: 'applied'
    },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'OrderPromos',
    timestamps: false
  });

  OrderPromo.associate = function(models) {
    OrderPromo.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
    OrderPromo.belongsTo(models.Coupon, { foreignKey: 'couponId', as: 'coupon' });
  };

  return OrderPromo;
};
