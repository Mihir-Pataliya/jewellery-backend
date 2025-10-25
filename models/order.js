'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    orderNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    totalAmount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    totalTax: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0
    },
    totalDiscount: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0
    },
    paymentStatus: {
      type: DataTypes.ENUM('Pending','Paid','Failed'),
      defaultValue: 'Pending'
    },
    orderStatus: {
      type: DataTypes.ENUM('Pending','Processing','Shipped','Delivered','Cancelled','Returned'),
      defaultValue: 'Pending'
    },
    areaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    addressId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    billingAddressId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    shippingMethod: {
      type: DataTypes.ENUM('Standard','Express','SameDay'),
      defaultValue: 'Standard'
    },
    trackingNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },

    couponId: {
  type: DataTypes.INTEGER,
  allowNull: true,
},

    shippingCharges: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0.00
    },
    totalQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    walletUsed: {
      type: DataTypes.DECIMAL(12,2),
      defaultValue: 0
    },


    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'Orders',
    timestamps: true
  });

  Order.associate = function(models) {
    Order.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Order.belongsTo(models.Address, { foreignKey: 'addressId', as: 'address' });
    Order.belongsTo(models.Address, { foreignKey: 'billingAddressId', as: 'billingAddress' });
    Order.belongsTo(models.Area, { foreignKey: 'areaId', as: 'area' });
    Order.hasMany(models.OrderItem, { foreignKey: 'orderId', as: 'orderItems' });
    Order.hasMany(models.SalesReport, { foreignKey: 'orderId', as: 'salesReports' });
    Order.hasMany(models.WalletHistory, { foreignKey: 'orderId', as: 'walletHistories' });
    Order.belongsTo(models.Coupon, { foreignKey: 'couponId', as: 'coupon' });
    Order.hasMany(models.Shipping, { foreignKey: 'orderId', as: 'shippings' });
    Order.hasMany(models.Invoice, { foreignKey: 'orderId', as: 'invoices' });
    Order.hasMany(models.LoyaltyTransaction, { foreignKey: 'orderId', as: 'loyaltyTransactions' });
    Order.hasMany(models.OrderPromo, { foreignKey: 'orderId', as: 'promos' })
    Order.hasMany(models.OrderRefund, { foreignKey: 'orderId', as: 'refunds' });
    Order.hasMany(models.OrderReturn, { foreignKey: 'orderId', as: 'returns' });
    Order.hasMany(models.Payment, { foreignKey: 'orderId', as: 'payments' });



  };

  return Order;
};
