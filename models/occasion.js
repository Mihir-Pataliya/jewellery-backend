'use strict';
module.exports = (sequelize, DataTypes) => {
  const Occasion = sequelize.define('Occasion', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false } // e.g., Engagement, Birthday
  }, {
    tableName: 'Occasions',
    timestamps: false
  });

  Occasion.associate = function(models) {
    
    Occasion.belongsToMany(models.Gift, { through: models.Gift_Occasion, as: 'gifts', foreignKey: 'occasionId', otherKey: 'giftId' });
  };

  return Occasion;
};
