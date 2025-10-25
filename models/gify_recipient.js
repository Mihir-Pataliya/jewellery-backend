'use strict';
module.exports = (sequelize, DataTypes) => {
  const Gift_Recipient = sequelize.define('Gift_Recipient', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    giftId: { type: DataTypes.INTEGER, allowNull: false },
    recipientId: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'Gift_Recipient',
    timestamps: false
  });

  Gift_Recipient.associate = function(models) {
    // Optional: direct access to Gift and Recipient from junction table
    Gift_Recipient.belongsTo(models.Gift, { foreignKey: 'giftId', as: 'gift' });
    Gift_Recipient.belongsTo(models.Recipient, { foreignKey: 'recipientId', as: 'recipient' });
  };

  return Gift_Recipient;
};
