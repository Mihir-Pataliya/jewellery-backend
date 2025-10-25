'use strict';
module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define('State', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'India'
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'States',
    timestamps: true
  });

  State.associate = function(models) {
    State.hasMany(models.City, { foreignKey: 'stateId', as: 'cities' });
    // State.hasMany(models.Shipping, { foreignKey: 'stateId', as: 'shippings' });
  };

  return State;
};
