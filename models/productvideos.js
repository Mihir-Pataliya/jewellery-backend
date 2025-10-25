'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductVideos = sequelize.define('ProductVideos', {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id'
      }
    },
    video_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    video_type: {
      type: DataTypes.ENUM('demo','360view','styling','unboxing'),
      defaultValue: 'demo'
    },
    status: {
      type: DataTypes.ENUM('active','inactive'),
      defaultValue: 'active'
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    duration: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: true
    },
    resolution: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'ProductVideos',
    timestamps: true,
    underscored: true
  });

  ProductVideos.associate = function(models) {
    // One product can have multiple videos
    ProductVideos.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
  };

  return ProductVideos;
};
