'use strict';
module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    userId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roleId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    staffId: { 
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    appointmentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    appointmentTime: {
      type: DataTypes.TIME, 
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending', 
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    tableName: 'Appointments',
    timestamps: true, 
  });

  Appointment.associate = function(models) {
    Appointment.belongsTo(models.User, { as: 'customer', foreignKey: 'userId' });

    Appointment.belongsTo(models.Staff, { as: 'staff', foreignKey: 'staffId' });

    Appointment.belongsTo(models.Role, { as: 'role', foreignKey: 'roleId' });
  };

  return Appointment;
};
