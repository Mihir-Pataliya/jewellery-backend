'use strict';
module.exports = (sequelize, DataTypes) => {
  const Referral = sequelize.define('Referral', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    referredUserId: {
      type: DataTypes.INTEGER,
      allowNull: true, // can be null until referred user registers
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    referralCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    reward: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'expired'),
      defaultValue: 'pending'
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
    tableName: 'Referrals',
    timestamps: true,
    underscored: true
  });

  Referral.associate = function(models) {
    // Each referral belongs to a user
    Referral.belongsTo(models.User, { foreignKey: 'userId', as: 'referrer' });
    Referral.belongsTo(models.User, { foreignKey: 'referredUserId', as: 'referredUser' });
  };

  return Referral;
};
