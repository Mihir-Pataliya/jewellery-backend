'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderRefund = sequelize.define('OrderRefund', {
    orderReturnId: { type: DataTypes.INTEGER, allowNull: false }, // link to return request
    orderId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.DECIMAL(12,2), allowNull: false },
    paymentMode: { type: DataTypes.ENUM('wallet','credit_card','debit_card','net_banking','upi'), allowNull: false },
    status: { type: DataTypes.ENUM('initiated','processed','failed','completed'), defaultValue: 'initiated' },
    refundedAt: { type: DataTypes.DATE, allowNull: true },
    createdBy: { type: DataTypes.INTEGER, allowNull: true },
    updatedBy: { type: DataTypes.INTEGER, allowNull: true }
  }, {
    tableName: 'OrderRefunds',
    timestamps: true
  });

  OrderRefund.associate = function(models) {
    OrderRefund.belongsTo(models.OrderReturn, { foreignKey: 'orderReturnId', as: 'orderReturn' });
    OrderRefund.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
    OrderRefund.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return OrderRefund;
};
