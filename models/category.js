'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    metaTitle: {
      type: DataTypes.STRING,
      allowNull: true
    },
    metaDescription: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: 'Categories',
    timestamps: true
  });

  Category.associate = function(models) {
    Category.hasMany(models.Category, { foreignKey: 'parentId', as: 'subcategories' });

    Category.hasMany(models.Product, { foreignKey: 'categoryId', as: 'products' });

    Category.hasOne(models.SeoMeta, { foreignKey: 'referenceId', as: 'seoMeta' });

    Category.hasMany(models.Offers, { foreignKey: 'category_id', as: 'offers' });

     Category.hasMany(models.PriceRange, { foreignKey: 'categoryId', as: 'priceRanges' });


  };

  return Category;
};
