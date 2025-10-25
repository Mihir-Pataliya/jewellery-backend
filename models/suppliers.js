'use strict';
module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define('Supplier', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contactPerson: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'Suppliers',
    timestamps: true
  });

  Supplier.associate = function(models) {
    Supplier.hasMany(models.Product, { foreignKey: 'supplierId', as: 'products' });
    Supplier.hasMany(models.PurchaseOrder, { foreignKey: 'supplierId', as: 'purchaseOrders' });
    Supplier.hasMany(models.SupplierPayment, { foreignKey: 'supplierId', as: 'payments' });
    Supplier.hasMany(models.SupplierProduct, { foreignKey: 'supplierId', as: 'products' });

  };

  return Supplier;
};
