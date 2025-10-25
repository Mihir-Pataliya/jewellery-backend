'use strict';
module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    userId: { // Customer who booked
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roleId: { // Role of the user (usually Customer)
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    staffId: { // Staff assigned to handle appointment
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    appointmentDate: {
      type: DataTypes.DATEONLY, // Only date
      allowNull: false,
    },
    appointmentTime: {
      type: DataTypes.TIME, // Time of appointment
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending', // pending, confirmed, cancelled
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    tableName: 'Appointments',
    timestamps: true, // createdAt and updatedAt
  });

  Appointment.associate = function(models) {
    Appointment.belongsTo(models.User, { as: 'customer', foreignKey: 'userId' });

    Appointment.belongsTo(models.Staff, { as: 'staff', foreignKey: 'staffId' });

    Appointment.belongsTo(models.Role, { as: 'role', foreignKey: 'roleId' });
  };

  return Appointment;
};
