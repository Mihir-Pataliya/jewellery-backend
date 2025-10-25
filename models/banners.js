'use strict';
module.exports = (sequelize, DataTypes) => {
  const Banner = sequelize.define('Banner', {
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    link: {
      type: DataTypes.STRING, 
      allowNull: true
    },
    position: {
      type: DataTypes.INTEGER, 
      defaultValue: 0
    },
    status: {
      type: DataTypes.BOOLEAN, 
      defaultValue: true
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
    tableName: 'Banners',
    timestamps: true
  });

  Banner.associate = function(models) {
        
    Banner.belongsTo(models.User, { foreignKey: 'createdBy', as: 'creator' });
    Banner.belongsTo(models.User, { foreignKey: 'updatedBy', as: 'updater' });
  };

  return Banner;
};
