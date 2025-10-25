'use strict';
module.exports = (sequelize, DataTypes) => {
  const Variant = sequelize.define('Variant', {
    productId: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    sku: { type: DataTypes.STRING, allowNull: false, unique: true },
    price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    status: { type: DataTypes.ENUM('active','inactive'), defaultValue: 'active' },
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER
  }, {
    tableName: 'Variants',
    timestamps: true
  });

  Variant.associate = function(models) {
    Variant.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });

    Variant.hasMany(models.StoreInventory, { foreignKey: 'variantId', as: 'inventories' });

   Variant.hasMany(models.OrderItem, { foreignKey: 'variantId', as: 'orderItems' });


  };

  return Variant;
};
