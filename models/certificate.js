'use strict';
module.exports = (sequelize, DataTypes) => {
  const Certificate = sequelize.define('Certificate', {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products', // links to Product table
        key: 'id'
      }
    },
    certificateNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    issuedBy: {
      type: DataTypes.STRING,
      allowNull: false
    },
    issuedDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fileUrl: {
      type: DataTypes.STRING, // path or URL to certificate file (PDF or image)
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('active','inactive'),
      defaultValue: 'active'
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
    tableName: 'Certificates',
    timestamps: true,
    underscored: true
  });

  Certificate.associate = function(models) {
  
    Certificate.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
  };

  return Certificate;
};
