'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderReturn = sequelize.define('OrderReturn', {
    orderId: { type: DataTypes.INTEGER, allowNull: false },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    reason: { type: DataTypes.TEXT, allowNull: true },
    status: { type: DataTypes.ENUM('requested','approved','rejected','completed'), defaultValue: 'requested' },
    returnDate: { type: DataTypes.DATE, allowNull: true },
    createdBy: { type: DataTypes.INTEGER, allowNull: true },
    updatedBy: { type: DataTypes.INTEGER, allowNull: true }
  }, {
    tableName: 'OrderReturns',
    timestamps: true
  });

  OrderReturn.associate = function(models) {
    OrderReturn.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
    OrderReturn.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
    OrderReturn.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    OrderReturn.hasMany(models.OrderRefund, { foreignKey: 'orderReturnId', as: 'refunds' });

  };

  return OrderReturn;
};
