'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProfitMargins = sequelize.define('ProfitMargins', {
    productId: { type: DataTypes.INTEGER, allowNull: false },
    costPrice: { type: DataTypes.DECIMAL(12,2), defaultValue: 0 },
    sellingPrice: { type: DataTypes.DECIMAL(12,2), defaultValue: 0 },
    profit: { type: DataTypes.DECIMAL(12,2), defaultValue: 0 },
    profitMarginPercentage: { type: DataTypes.DECIMAL(5,2), defaultValue: 0 }
  }, {
    tableName: 'ProfitMargins',
    timestamps: true
  });

  ProfitMargins.associate = function(models) {
    ProfitMargins.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
  };

  return ProfitMargins;
};
