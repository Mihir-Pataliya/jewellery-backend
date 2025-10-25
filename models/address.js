'use strict';
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    areaId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false
    },
    building: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pincode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {                 
      type: DataTypes.STRING,
      allowNull: true
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
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
    tableName: 'Addresses',
    timestamps: true,
    underscored: true
  });

  Address.associate = function(models) {
    Address.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Address.belongsTo(models.Area, { foreignKey: 'areaId', as: 'area' });
   
  };

  return Address;
};
