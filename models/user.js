'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    emailVerificationToken: {
      type: DataTypes.STRING,
      allowNull: true
    },

    emailVerificationTokenExpires: {
    type: DataTypes.DATE,
     allowNull: true
    },

    passwordResetToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    passwordResetExpires: {
      type: DataTypes.DATE,
      allowNull: true
    },
    tokenVersion: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },

    failedLoginAttempts: { 
    type: DataTypes.INTEGER,
    defaultValue: 0
    },

    lastFailedLogin: {
    type: DataTypes.DATE,
    allowNull: true
    },

      referralCode: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    walletBalance: { 
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    }
  }, {
    tableName: 'Users',
    timestamps: true,
    underscored: true
  });

  User.associate = function(models) {

    User.belongsTo(models.Role, { foreignKey: 'roleId', as: 'role' });

    User.hasMany(models.Order, { foreignKey: 'userId', as: 'orders' });

    User.hasOne(models.Cart, { foreignKey: 'userId', as: 'cart' });

    User.hasMany(models.Review, { foreignKey: 'userId', as: 'reviews' });

    User.hasMany(models.Wishlist, { foreignKey: 'userId', as: 'wishlist' });

    User.hasMany(models.WalletHistory, { foreignKey: 'userId', as: 'wallet' });

    User.hasMany(models.Referral, { foreignKey: 'userId', as: 'referralsMade' });

    User.hasMany(models.Referral, { foreignKey: 'referredUserId', as: 'referredBy' });

    User.hasMany(models.Payment, { foreignKey: 'userId', as: 'payments' });

    User.hasMany(models.Address, { foreignKey: 'userId', as: 'addresses' });

    User.hasMany(models.SalesReport, { foreignKey: 'userId', as: 'salesReports' });

    User.hasMany(models.Shipping, { foreignKey: 'userId', as: 'shippings' });

    User.hasMany(models.SearchLog, { foreignKey: 'userId', as: 'searchLogs' });

    // User.hasMany(models.Tag, { foreignKey: 'createdBy', as: 'createdTags' });

    // User.hasMany(models.Tag, { foreignKey: 'updatedBy', as: 'updatedTags' });

    User.hasMany(models.AnalyticsEvent, { foreignKey: 'userId', as: 'analyticsEvents' });

    User.hasMany(models.Appointment, { foreignKey: 'userId', as: 'customerAppointments' });

    User.hasMany(models.Appointment, { foreignKey: 'staffId', as: 'staffAppointments' });

    User.hasMany(models.Banner, { foreignKey: 'createdBy', as: 'createdBanners' });

    User.hasMany(models.Banner, { foreignKey: 'updatedBy', as: 'updatedBanners' });

    User.hasMany(models.BlogPost, { foreignKey: 'createdBy', as: 'createdBlogPosts' });

    User.hasMany(models.BlogPost, { foreignKey: 'updatedBy', as: 'updatedBlogPosts' });

    User.hasOne(models.CustomerLifetimeValue, { foreignKey: 'userId', as: 'lifetimeValue' });

    User.hasMany(models.CustomerLoyalty, { foreignKey: 'userId', as: 'loyalties' })

    User.hasMany(models.Invoice, { foreignKey: 'userId', as: 'invoices' });

    User.hasMany(models.Log, { foreignKey: 'userId', as: 'logs' });

    User.hasMany(models.LoyaltyTransaction, { foreignKey: 'userId', as: 'loyaltyTransactions' });

    User.hasMany(models.Notification, { foreignKey: 'userId', as: 'notifications' });

    User.hasMany(models.OrderRefund, { foreignKey: 'userId', as: 'refunds' });

    User.hasMany(models.OrderReturn, { foreignKey: 'userId', as: 'returns' });

    User.hasMany(models.Payment, { foreignKey: 'userId', as: 'payments' });

    User.hasMany(LoginHistory, { foreignKey: 'userId', as: 'loginHistories' });




  };

  return User;
};
