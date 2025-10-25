'use strict';
module.exports = (sequelize, DataTypes) => {
  const Area = sequelize.define('Area', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pincode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'Areas',
    timestamps: true
  });

  Area.associate = function(models) {
    Area.belongsTo(models.City, { foreignKey: 'cityId', as: 'city' });
    Area.hasMany(models.Store, { foreignKey: 'areaId', as: 'stores' });
    // Area.hasMany(models.Order, { foreignKey: 'areaId', as: 'orders' });
    Area.hasMany(models.Address, { foreignKey: 'areaId', as: 'addresses' });
    // Area.hasMany(models.Shipping, { foreignKey: 'areaId', as: 'shippings' });
};

  return Area;
};
