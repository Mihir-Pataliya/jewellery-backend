'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    paymentMethod: {
      type: DataTypes.ENUM('UPI','Card','Netbanking','COD','Wallet'),
      allowNull: false
    },
    paymentGateway: {
      type: DataTypes.STRING,
      allowNull: true
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: 'INR'
    },
    status: {
      type: DataTypes.ENUM('Pending','Success','Failed','Refunded'),
      defaultValue: 'Pending'
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'Payments',
    timestamps: true
  });

  Payment.associate = function(models) {
    Payment.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
    Payment.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Payment;
};
