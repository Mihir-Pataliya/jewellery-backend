'use strict';
module.exports = (sequelize, DataTypes) => {
  const SeoMeta = sequelize.define('SeoMeta', {
    referenceType: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    referenceId: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    metaTitle: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    metaDescription: { 
      type: DataTypes.TEXT,
      allowNull: true
    },
    metaKeywords: { 
      type: DataTypes.STRING,
      allowNull: true
    },
    status: { // active/inactive
      type: DataTypes.ENUM('active','inactive'),
      defaultValue: 'active'
    }
  }, {
    tableName: 'SeoMetas',
    timestamps: true
  });

  SeoMeta.associate = function(models) {

  SeoMeta.belongsTo(models.Product, { foreignKey: 'referenceId', as: 'product' });
  SeoMeta.belongsTo(models.Category, { foreignKey: 'referenceId', as: 'category' });
  SeoMeta.belongsTo(models.Page, { foreignKey: 'referenceId', as: 'page' });

  };

  return SeoMeta;
};
