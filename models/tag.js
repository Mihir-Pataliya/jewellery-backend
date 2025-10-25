'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
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
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    createdBy: { // Now we can store roleId safely
      type: DataTypes.INTEGER,
      allowNull: true
    },
    updatedBy: { // Now we can store roleId safely
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'Tags',
    timestamps: true
  });

  Tag.associate = function(models) {
    // Relations with products remain
    Tag.belongsToMany(models.Product, { through: models.ProductTags, foreignKey: 'tagId', as: 'products' });
    Tag.hasMany(models.ProductTags, { foreignKey: 'tagId', as: 'productTags' });

    // Remove the foreign key to User to allow storing roleId
    // Tag.belongsTo(models.User, { foreignKey: 'createdBy', as: 'creator' });
    // Tag.belongsTo(models.User, { foreignKey: 'updatedBy', as: 'updater' });
  };

  return Tag;
};
