'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' },
    },
    status: { 
      type: DataTypes.ENUM('active','ordered','abandoned'),
      defaultValue: 'active',
      allowNull: false,
    },
    totalAmount: { 
      type: DataTypes.DECIMAL(10,2),
      defaultValue: 0.0,
    },
    createdBy: { type: DataTypes.INTEGER, allowNull: true },
    updatedBy: { type: DataTypes.INTEGER, allowNull: true }
  }, {
    tableName: 'Carts',
    timestamps: true,
    underscored: true,
  });

  Cart.associate = function(models) {
    Cart.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
    Cart.hasMany(models.CartItem, { as: 'items', foreignKey: 'cartId' });
  };

  return Cart;
};
