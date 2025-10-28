'use strict';
module.exports = (sequelize, DataTypes) => {
  const TaxCalculation = sequelize.define('TaxCalculation', {
    metalType: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Type of metal like Gold, Silver, Diamond, etc.'
    },
    taxType: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Tax type like GST, IGST, CGST'
    },
    taxPercentage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      comment: 'Tax rate percentage for this metal type'
    },
    effectiveFrom: {
      type: DataTypes.DATE,
      allowNull: false
    },
    effectiveTo: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'TaxCalculations',
    timestamps: true
  });

  TaxCalculation.associate = function(models) {
    // One metal type tax applies to many products having same metalType
    TaxCalculation.hasMany(models.Product, {
      foreignKey: 'metalType',   // product.metalType
      sourceKey: 'metalType',    // taxCalculation.metalType
      as: 'products'
    });
  };

  return TaxCalculation;
};
