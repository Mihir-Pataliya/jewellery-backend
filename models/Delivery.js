'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shipping = sequelize.define('Shipping', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    orderId: { type: DataTypes.INTEGER, allowNull: false },
    addressLine1: { type: DataTypes.STRING, allowNull: false },
    addressLine2: DataTypes.STRING,
    cityId: { type: DataTypes.INTEGER, allowNull: false },
    stateId: { type: DataTypes.INTEGER, allowNull: false },
    areaId: { type: DataTypes.INTEGER, allowNull: false },
    pincode: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    deliveryStatus: { type: DataTypes.ENUM('pending','shipped','delivered','cancelled'), defaultValue: 'pending' },
    trackingNumber: DataTypes.STRING,
    expectedDelivery: DataTypes.DATE,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER
  }, {
    tableName: 'Shipping',
    timestamps: true
  });

  Shipping.associate = function(models) {
    Shipping.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Shipping.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
    Shipping.belongsTo(models.City, { foreignKey: 'cityId', as: 'city' });
    Shipping.belongsTo(models.State, { foreignKey: 'stateId', as: 'state' });
    Shipping.belongsTo(models.Area, { foreignKey: 'areaId', as: 'area' });
  };

  return Shipping;
};
