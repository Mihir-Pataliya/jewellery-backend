'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderPromo = sequelize.define('OrderPromo', {
    orderId: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },


    couponId: { 
      type: DataTypes.INTEGER,
      allowNull: true
    },


    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    promoCode: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    discountAmount: { 
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
