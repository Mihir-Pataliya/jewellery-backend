'use strict';
module.exports = (sequelize, DataTypes) => {
  const SupplierProduct = sequelize.define('SupplierProduct', {
    supplierId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    costPrice: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    supplyDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'SupplierProducts',
    timestamps: true
  });

  SupplierProduct.associate = function(models) {
    SupplierProduct.belongsTo(models.Supplier, { foreignKey: 'supplierId', as: 'supplier' });
    SupplierProduct.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
  };

  return SupplierProduct;
};
