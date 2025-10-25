'use strict';
module.exports = (sequelize, DataTypes) => {
  const WalletHistory = sequelize.define('WalletHistory', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('referral', 'purchase', 'refund', 'admin_credit', 'other'),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Orders', 
        key: 'id'
      }
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'WalletHistories',
    timestamps: true,
    underscored: true
  });

  WalletHistory.associate = function(models) {
    WalletHistory.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    WalletHistory.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
  };

  return WalletHistory;
};
