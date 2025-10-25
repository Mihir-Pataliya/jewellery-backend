'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rating: {
      type: DataTypes.DECIMAL(2,1),
      allowNull: false
    },
    title: DataTypes.STRING,
    comment: DataTypes.TEXT,
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'Reviews',
    timestamps: true
  });

  Review.associate = function(models) {
    Review.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
    Review.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Review.hasMany(models.ReviewImage, { foreignKey: 'reviewId', as: 'images' });

  };

  return Review;
};
