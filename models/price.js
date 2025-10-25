'use strict';
module.exports = (sequelize, DataTypes) => {
  const PriceRange = sequelize.define('PriceRange', {
    minPrice: { type: DataTypes.DECIMAL(12,2), allowNull: false },
    maxPrice: { type: DataTypes.DECIMAL(12,2), allowNull: true },
    label: { type: DataTypes.STRING(50), allowNull: false },
    categoryId: { type: DataTypes.INTEGER, allowNull: true },
    status: { type: DataTypes.ENUM('active','inactive'), defaultValue: 'active' },
    createdBy: { type: DataTypes.INTEGER, allowNull: true },
    updatedBy: { type: DataTypes.INTEGER, allowNull: true }
  }, {
    tableName: 'PriceRanges',
    timestamps: true,
    underscored: true
  });

  PriceRange.associate = function(models) {
    PriceRange.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
  };

  return PriceRange;
};
