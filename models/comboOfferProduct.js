'use strict';
module.exports = (sequelize, DataTypes) => {
  const ComboOfferProducts = sequelize.define('ComboOfferProducts', {
    comboOfferId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'ComboOffers', key: 'id' } // ✅ This is fine since table name is ComboOffers
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Products', key: 'id' } // ✅ Same here
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
    // ✅ Each combo-product belongs to a ComboOffer
   ComboOfferProducts.belongsTo(models.ComboOffer, { foreignKey: 'comboOfferId', as: 'comboOffer' });
ComboOfferProducts.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });

  };

  return ComboOfferProducts;
};
