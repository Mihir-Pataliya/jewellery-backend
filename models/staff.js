'use strict';
module.exports = (sequelize, DataTypes) => {
  const Staff = sequelize.define('Staff', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    roleId: { type: DataTypes.INTEGER, allowNull: false },
    storeId: { type: DataTypes.INTEGER, allowNull: false }, 
    password: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.BOOLEAN, defaultValue: true },
    lastLogin: { type: DataTypes.DATE, allowNull: true },
    profileImage: { type: DataTypes.STRING, allowNull: true }
  }, {
    tableName: 'Staffs',
    timestamps: true
  });

  Staff.associate = function(models) {
    Staff.belongsTo(models.Role, { foreignKey: 'roleId', as: 'role' });
    Staff.belongsTo(models.Store, { foreignKey: 'storeId', as: 'store' });
    Staff.hasMany(models.Appointment, { foreignKey: 'staffId', as: 'appointments' });
  };

  return Staff;
};
