'use strict';
module.exports = (sequelize, DataTypes) => {
  const SalesReport = sequelize.define('SalesReport', {
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: { model: 'Orders', key: 'id' }
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: { model: 'Products', key: 'id' }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // references: { model: 'Users', key: 'id' }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    unitPrice: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    discountAmount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    taxAmount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    totalAmount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    soldAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    paymentStatus: {
      type: DataTypes.ENUM('Paid','Pending','Failed'),
      defaultValue: 'Paid'
    },
    createdBy: { type: DataTypes.INTEGER, allowNull: true },
    updatedBy: { type: DataTypes.INTEGER, allowNull: true }
  }, {
    tableName: 'SalesReports',
    timestamps: true,
    underscored: true
  });

  SalesReport.associate = function(models) {
    SalesReport.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
    SalesReport.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
    SalesReport.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return SalesReport;
};
