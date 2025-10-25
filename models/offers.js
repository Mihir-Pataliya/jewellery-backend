'use strict';
module.exports = (sequelize, DataTypes) => {
  const Offers = sequelize.define('Offers', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    offer_type: {
      type: DataTypes.ENUM('percentage','flat','buy_one_get_one','combo'),
      defaultValue: 'percentage'
    },
    discount_value: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('active','inactive','expired'),
      defaultValue: 'active'
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Products',
        key: 'id'
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Categories',
        key: 'id'
      }
    }
  }, {
    tableName: 'Offers',
    timestamps: true,
    underscored: true
  });

  Offers.associate = function(models) {
    Offers.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
    Offers.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
     Offers.hasMany(models.Coupon, { foreignKey: 'offer_id', as: 'coupons' });
  };

  return Offers;
};
