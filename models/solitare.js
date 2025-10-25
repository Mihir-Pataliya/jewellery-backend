'use strict';
module.exports = (sequelize, DataTypes) => {
  const Solitaire = sequelize.define('Solitaire', {
    productId: { type: DataTypes.INTEGER, allowNull: false }, // Link to Product
    diamondWeight: { type: DataTypes.DECIMAL(5,2), allowNull: false },
    diamondColor: { type: DataTypes.STRING, allowNull: false },
    diamondClarity: { type: DataTypes.STRING, allowNull: false },
    diamondCut: { type: DataTypes.STRING, allowNull: false },
    certification: { type: DataTypes.STRING, allowNull: true },
    settingType: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, {
    tableName: 'Solitaires',
    timestamps: true
  });

  Solitaire.associate = function(models) {
    Solitaire.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
  };

  return Solitaire;
};
