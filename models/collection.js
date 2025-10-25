'use strict';
module.exports = (sequelize, DataTypes) => {
  const Collection = sequelize.define('Collection', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true 
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    bannerImage: {
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
    tableName: 'Collections',
    timestamps: true
  });

  Collection.associate = function(models) {

    Collection.hasMany(models.Product, { foreignKey: 'collectionId', as: 'products' });
    Collection.hasMany(models.DesignerCollections, { foreignKey: 'collectionId', as: 'designerCollections' });
  };

  return Collection;
};
