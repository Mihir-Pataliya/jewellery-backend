'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipient = sequelize.define('Recipient', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false } 
  }, {
    tableName: 'Recipients',
    timestamps: false
  });

  Recipient.associate = function(models) {
    Recipient.belongsToMany(models.Gift, { through: 'Gift_Recipient', as: 'gifts', foreignKey: 'recipientId' });
  };

  return Recipient;
};
