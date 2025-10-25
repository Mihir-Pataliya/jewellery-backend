'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductTags = sequelize.define('ProductTags', {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
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
    tableName: 'ProductTags',
    timestamps: true 
  });

  ProductTags.associate = function(models) {
    ProductTags.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
    ProductTags.belongsTo(models.Tag, { foreignKey: 'tagId', as: 'tag' });
  };

  return ProductTags;
};
