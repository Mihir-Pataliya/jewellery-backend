'use strict';
module.exports = (sequelize, DataTypes) => {
  const FinancialReport = sequelize.define('FinancialReport', {
    reportName: { type: DataTypes.STRING, allowNull: false },
    reportType: { type: DataTypes.STRING, allowNull: false }, // Monthly, Quarterly, Annual
    generatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    fileUrl: { type: DataTypes.STRING, allowNull: false }, // URL to download report
    status: { type: DataTypes.ENUM('pending','completed','failed'), defaultValue: 'pending' }
  }, {
    tableName: 'FinancialReports',
    timestamps: true
  });

  return FinancialReport;
};
