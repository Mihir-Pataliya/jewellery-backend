'use strict';
module.exports = (sequelize, DataTypes) => {
  const SupplierPayment = sequelize.define('SupplierPayment', {
    supplierId: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    paymentDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    paymentMethod: { type: DataTypes.STRING, allowNull: false }, 
    status: { type: DataTypes.ENUM('pending','completed','failed'), defaultValue: 'pending' },
    remarks: { type: DataTypes.TEXT, allowNull: true }
  }, {
    tableName: 'SupplierPayments',
    timestamps: true
  });

  SupplierPayment.associate = function(models) {
    SupplierPayment.belongsTo(models.Supplier, { foreignKey: 'supplierId', as: 'supplier' });
  };

  return SupplierPayment;
};
