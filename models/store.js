'use strict';
module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define('Store', {
    name: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    code: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    address: { 
      type: DataTypes.STRING,
      allowNull: true
    },
    cityId: { 
      type: DataTypes.INTEGER,
      allowNull: true
    },

     areaId: { 
      type: DataTypes.INTEGER,
      allowNull: true
    },

    phone: { 
      type: DataTypes.STRING,
      allowNull: true
    },
    email: { 
      type: DataTypes.STRING,
      allowNull: true
    },
    status: { 
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'Stores',
    timestamps: true
  });

  Store.associate = function(models) {
     Store.hasMany(models.Stock, { foreignKey: 'storeId', as: 'stocks' });
     Store.hasMany(models.Staff, { foreignKey: 'storeId', as: 'staffs' });
     Store.hasMany(models.StoreInventory, { foreignKey: 'storeId', as: 'inventories' });
     Store.belongsTo(models.City, { foreignKey: 'cityId', as: 'city' });
     Store.hasMany(models.RevenueAnalytics, { foreignKey: 'storeId', as: 'revenueAnalytics' });
     Store.belongsTo(models.Area, { foreignKey: 'areaId', as: 'area' });
     Store.hasMany(models.InventoryAnalytics, { foreignKey: 'storeId', as: 'inventoryAnalytics' });





  };

  return Store;
};
