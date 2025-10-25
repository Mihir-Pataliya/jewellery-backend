'use strict';
module.exports = (sequelize, DataTypes) => {
  const StoreInventory = sequelize.define('StoreInventory', {
    storeId: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    variantId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    quantity: { 
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    status: { 
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'StoreInventory',
    timestamps: true
  });

  StoreInventory.associate = function(models) {
    StoreInventory.belongsTo(models.Store, { foreignKey: 'storeId', as: 'store' });
    StoreInventory.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
    StoreInventory.belongsTo(models.Variant, { foreignKey: 'variantId', as: 'variant' });
  };

  return StoreInventory;
};
