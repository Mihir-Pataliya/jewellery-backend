'use strict';
module.exports = (sequelize, DataTypes) => {
  const DesignerCollections = sequelize.define('DesignerCollections', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true
    },

    collectionId:{
      type: DataTypes.INTEGER,
      allowNull: false
    },

    status: {
      type: DataTypes.ENUM('active','inactive'),
      defaultValue: 'active'
    }
  }, {
    tableName: 'DesignerCollections',
    timestamps: true,
    underscored: true
  });

  DesignerCollections.associate = function(models) {
    DesignerCollections.hasMany(models.Product, { foreignKey: 'designerCollectionId', as: 'products' });
    DesignerCollections.belongsTo(models.Collection, { foreignKey: 'collectionId', as: 'collection' });
  };

  return DesignerCollections;
};
