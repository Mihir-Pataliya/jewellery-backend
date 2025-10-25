'use strict';
module.exports = (sequelize, DataTypes) => {
  const TaxCalculation = sequelize.define('TaxCalculation', {
    productId: { type: DataTypes.INTEGER, allowNull: false },
    taxType: { type: DataTypes.STRING, allowNull: false }, // GST, IGST, CGST
    taxPercentage: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
    effectiveFrom: { type: DataTypes.DATE, allowNull: false },
    effectiveTo: { type: DataTypes.DATE, allowNull: true }
  }, {
    tableName: 'TaxCalculations',
    timestamps: true
  });

  TaxCalculation.associate = function(models) {
   TaxCalculation.hasMany(models.Product, { foreignKey: 'taxId', as: 'products' });
   TaxCalculation.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });

  };

  return TaxCalculation;
};
