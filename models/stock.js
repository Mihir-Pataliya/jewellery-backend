'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define('Stock', {
    productId: { type: DataTypes.INTEGER, allowNull: false },
    variant: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
    sku: { type: DataTypes.STRING, allowNull: false, unique: true },
    price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    status: { type: DataTypes.ENUM('available','out_of_stock','discontinued'), defaultValue: 'available' },
    createdBy: { type: DataTypes.INTEGER, allowNull: true },
    updatedBy: { type: DataTypes.INTEGER, allowNull: true }
  }, {
    tableName: 'Stock',
    timestamps: true
  });

  Stock.associate = function(models) {
    Stock.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
  };

  return Stock;
};
