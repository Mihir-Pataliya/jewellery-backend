'use strict';
module.exports = (sequelize, DataTypes) => {
  const ComboOfferProducts = sequelize.define('ComboOfferProducts', {
    comboOfferId: {
      type: DataTypes.INTEGER,
      references: { model: 'ComboOffers', key: 'id' },
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      references: { model: 'Products', key: 'id' },
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    tableName: 'ComboOfferProducts',
    timestamps: false
  });

  ComboOfferProducts.associate = function(models) {
  ComboOfferProducts.belongsTo(models.ComboOffer, { foreignKey: 'comboOfferId', as: 'comboOffer' });
  
   ComboOfferProducts.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
};


  return ComboOfferProducts;
};
