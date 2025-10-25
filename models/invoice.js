'use strict';
module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define('Invoice', {
    invoiceNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
    orderId: { type: DataTypes.INTEGER, allowNull: false },      // Link to Order
    userId: { type: DataTypes.INTEGER, allowNull: false },       // Customer
    totalAmount: { type: DataTypes.DECIMAL(12,2), allowNull: false },
    taxAmount: { type: DataTypes.DECIMAL(10,2), defaultValue: 0 },
    discountAmount: { type: DataTypes.DECIMAL(10,2), defaultValue: 0 },
    finalAmount: { type: DataTypes.DECIMAL(12,2), allowNull: false },
    status: { type: DataTypes.ENUM('pending','paid','cancelled','refunded'), defaultValue: 'pending' },
    issuedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'Invoices',
    timestamps: true
  });

  Invoice.associate = function(models) {
    Invoice.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
    Invoice.belongsTo(models.User, { foreignKey: 'userId', as: 'customer' });
  };

  return Invoice;
};
