'use strict';
module.exports = (sequelize, DataTypes) => {
  const Promo = sequelize.define('Promo', {
    promoCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    discountType: {
      type: DataTypes.ENUM('percentage','fixed'),
      allowNull: false
    },
    discountValue: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'Promos',
    timestamps: true
  });

  Promo.associate = function(models) {
    // Each promo belongs to one category
    Promo.belongsTo(models.PromoCategory, { foreignKey: 'promoCategoryId', as: 'category' });
  };

  return Promo;
};
