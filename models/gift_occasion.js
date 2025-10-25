'use strict';
module.exports = (sequelize, DataTypes) => {
  const Gift_Occasion = sequelize.define('Gift_Occasion', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    giftId: { type: DataTypes.INTEGER, allowNull: false },
    occasionId: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'Gift_Occasion',
    timestamps: false
  });

  Gift_Occasion.associate = function(models) {
    // Optional: Direct access to Gift and Occasion from junction table
    Gift_Occasion.belongsTo(models.Gift, { foreignKey: 'giftId', as: 'gift' });
    Gift_Occasion.belongsTo(models.Occasion, { foreignKey: 'occasionId', as: 'occasion' });
  };

  return Gift_Occasion;
};
