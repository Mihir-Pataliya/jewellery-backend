'use strict';
module.exports = (sequelize, DataTypes) => {
  const Gift = sequelize.define('Gift', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    productId: { type: DataTypes.INTEGER, allowNull: false }, // Link to Product table
    type: { type: DataTypes.ENUM('special','wrapping','card','combo'), defaultValue: 'special' },
    status: { type: DataTypes.ENUM('active','inactive'), defaultValue: 'active' },
    createdBy: { type: DataTypes.INTEGER, allowNull: true },
    updatedBy: { type: DataTypes.INTEGER, allowNull: true }
  }, {
    tableName: 'Gifts',
    timestamps: true,
    underscored: true,
  });

  Gift.associate = function(models) {
    
    Gift.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });

    Gift.belongsToMany(models.Occasion, { through: models.Gift_Occasion, as: 'occasions', foreignKey: 'giftId', otherKey: 'occasionId' });

    Gift.belongsToMany(models.Recipient, { through: models.Gift_Recipient, as: 'recipients', foreignKey: 'giftId', otherKey: 'recipientId' });
  };

  return Gift;
};
