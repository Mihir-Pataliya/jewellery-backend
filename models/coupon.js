'use strict';
module.exports = (sequelize, DataTypes) => {
  const Coupon = sequelize.define('Coupon', {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    discountType: {
      type: DataTypes.ENUM('Percentage','Flat'),
      allowNull: false
    },
    discountValue: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    minPurchaseAmount: {
      type: DataTypes.DECIMAL(10,2),
      defaultValue: 0.00
    },
    maxDiscountAmount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    usageLimitPerUser: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    usageLimitTotal: {
      type: DataTypes.INTEGER,
      defaultValue: 1000
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'Coupons',
    timestamps: true
  });

  Coupon.associate = function(models) {
    Coupon.hasMany(models.Order, { foreignKey: 'couponId', as: 'orders' });
    Coupon.hasMany(models.OrderPromo, { foreignKey: 'couponId', as: 'orderPromos' });
  };

  return Coupon;
};
