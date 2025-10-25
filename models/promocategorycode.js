'use strict';
module.exports = (sequelize, DataTypes) => {
  const PromoCategory = sequelize.define('PromoCategory', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'PromoCategories',
    timestamps: true
  });

  PromoCategory.associate = function(models) {
    // One PromoCategory can have many Promos
    PromoCategory.hasMany(models.Promo, { foreignKey: 'promoCategoryId', as: 'promos' });
  };

  return PromoCategory;
};
