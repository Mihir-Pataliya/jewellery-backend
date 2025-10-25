'use strict';
module.exports = (sequelize, DataTypes) => {
  const ComboOffer = sequelize.define('ComboOffer', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    discountType: {
      type: DataTypes.ENUM('percentage','fixed'),
      defaultValue: 'percentage'
    },
    discountValue: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('active','inactive','expired'),
      defaultValue: 'active'
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'ComboOffers',
    timestamps: true,
    underscored: true
  });

  ComboOffer.associate = function(models) {

    ComboOffer.hasMany(models.ComboOfferProducts, { foreignKey: 'comboOfferId', as: 'comboOfferProducts' });

    ComboOffer.belongsToMany(models.Product, { 
      through: 'ComboOfferProducts', 
      as: 'products', 
      foreignKey: 'comboOfferId' 
    });
  };

  return ComboOffer;
};
