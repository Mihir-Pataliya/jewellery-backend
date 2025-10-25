'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    status: { type: DataTypes.ENUM('active','inactive'), defaultValue: 'active' },
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER
  }, {
    tableName: 'Roles',
    timestamps: true
  });

  Role.associate = function(models) {
    Role.hasMany(models.User, { foreignKey: 'roleId', as: 'users' });
    Role.hasMany(models.Staff, { foreignKey: 'roleId', as: 'staffs' });

  };

  return Role;
};
