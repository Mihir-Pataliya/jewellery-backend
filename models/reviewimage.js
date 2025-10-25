'use strict';
module.exports = (sequelize, DataTypes) => {
  const ReviewImage = sequelize.define('ReviewImage', {
    reviewId: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imageUrl: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    isPrimary: { 
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    caption: { 
      type: DataTypes.STRING,
      allowNull: true
    },
    status: { 
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'ReviewImages',
    timestamps: true
  });

  ReviewImage.associate = function(models) {
    ReviewImage.belongsTo(models.Review, { foreignKey: 'reviewId', as: 'review' });
  };

  return ReviewImage;
};
