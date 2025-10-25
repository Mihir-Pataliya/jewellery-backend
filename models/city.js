'use strict';
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    stateId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    timezone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 7),
      allowNull: true
    },
    longitude: {
      type: DataTypes.DECIMAL(10, 7),
      allowNull: true
    }
  }, {
    tableName: 'Cities',
    timestamps: true
  });

  City.associate = function(models) {
    City.belongsTo(models.State, { foreignKey: 'stateId', as: 'state' });
    // City.hasMany(models.Area, { foreignKey: 'cityId', as: 'areas' });
    // City.hasMany(models.Store, { foreignKey: 'cityId', as: 'stores' });
    // City.hasMany(models.Shipping, { foreignKey: 'cityId', as: 'shippings' });

  };

  return City;
};
