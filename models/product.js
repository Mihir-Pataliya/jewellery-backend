'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    collectionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    metalType: {
      type: DataTypes.ENUM('Gold', 'Silver', 'Platinum', 'Diamond', 'Other'),
      allowNull: false
    },
    materialPurity: {
      type: DataTypes.ENUM('24K', '22K', '18K', '14K', 'Other'),
      allowNull: true
    },
    weight: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    gemstone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gemstoneWeight: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    },
    length: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    imageUrls: {
     type: DataTypes.JSON,
    allowNull: true
    },

    status: {
      type: DataTypes.ENUM('active','inactive','out_of_stock'),
      defaultValue: 'active'
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      defaultValue: 0
    },
    returnable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    warranty: {
      type: DataTypes.STRING,
      allowNull: true
    },
    metaTitle: {
      type: DataTypes.STRING,
      allowNull: true
    },
    metaDescription: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    shippingWeight: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },


    supplierId: {
    type: DataTypes.INTEGER,
  // allowNull: false
  },

    taxId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Taxes',
        key: 'id'
      }
    },
    isComboEligible: {   // NEW FIELD
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },

    designerCollectionId: {
  type: DataTypes.INTEGER,
  allowNull: true,
  references: {
    model: 'DesignerCollections',
    key: 'id'
  }
},

  }, {
    tableName: 'Products',
    timestamps: true,
    underscored: true
  });

  Product.associate = function(models) {
  
    Product.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });

    Product.belongsTo(models.Collection, { foreignKey: 'collectionId', as: 'collection' });

    // Product.belongsTo(models.TaxCalculation, { foreignKey: 'taxId', as: 'tax' });

    Product.hasOne(models.Gift, { foreignKey: 'productId', as: 'gift' });

    Product.belongsToMany(models.Occasion, { through: 'Gift_Occasion', as: 'occasions', foreignKey: 'productId' });

    Product.belongsToMany(models.Recipient, { through: 'Gift_Recipient', as: 'recipients', foreignKey: 'productId' });

    Product.hasMany(models.Review, { foreignKey: 'productId', as: 'reviews' });

    Product.belongsToMany(models.ComboOffer, { through: 'ComboOfferProducts', as: 'comboOffers', foreignKey: 'productId' });

    Product.hasMany(models.ComboOfferProducts, { foreignKey: 'productId', as: 'comboOfferProducts' });

    Product.belongsTo(models.DesignerCollection, { foreignKey: 'designerCollectionId', as: 'designerCollection' });

    Product.hasMany(models.Stock, { foreignKey: 'productId', as: 'stocks' });

    Product.hasMany(models.Wishlist, { foreignKey: 'productId', as: 'wishlists' });

    Product.hasMany(models.CartItem, { foreignKey: 'productId', as: 'cartItems' });

    Product.hasMany(models.Gift, { foreignKey: 'productId', as: 'gifts' });

    Product.hasMany(models.ProductImage, { foreignKey: 'productId', as: 'images' });

    Product.hasMany(models.OrderItem, { foreignKey: 'productId', as: 'orderItems' });

    Product.hasMany(models.OrderReturn, { foreignKey: 'productId', as: 'returns' });

    Product.hasMany(models.PurchaseOrderItem, { foreignKey: 'productId', as: 'purchaseOrderItems' });

    // Product.hasMany(models.ReturnRequest, { foreignKey: 'productId', as: 'returnRequests' });

    // Product.belongsTo(models.TaxCalculation, { foreignKey: 'taxId', as: 'tax' });

    //  Product.hasMany(models.TaxCalculation, { foreignKey: 'productId', as: 'taxCalculations' });
     
     Product.hasMany(models.StoreInventory, { foreignKey: 'productId', as: 'storeInventories' });

     Product.hasMany(models.ProductVideos, { foreignKey: 'product_id', as: 'videos' });

      Product.hasMany(models.ProductTags, { foreignKey: 'productId', as: 'productTags' });

      Product.hasMany(models.ProfitMargins, { foreignKey: 'productId', as: 'profitMargins' });

      Product.belongsTo(models.Supplier, { foreignKey: 'supplierId', as: 'supplier' });

      Product.hasMany(models.SalesReport, { foreignKey: 'productId', as: 'salesReports' });

      Product.hasOne(models.SeoMeta, { foreignKey: 'referenceId', as: 'seoMeta' });

      Product.hasMany(models.Solitaire, { foreignKey: 'productId', as: 'solitaires' });

      Product.hasMany(models.SupplierProduct, { foreignKey: 'productId', as: 'suppliers' });

      Product.belongsToMany(models.Tag, { through: models.ProductTags, foreignKey: 'productId', as: 'tags' });

      Product.hasMany(models.Variant, { foreignKey: 'productId', as: 'variants' });

      // Product.hasMany(models.RevenueAnalytics, { foreignKey: 'productId', as: 'revenueAnalytics' });
     
      Product.hasMany(models.Certificate, { foreignKey: 'productId', as: 'certificates' });

      Product.hasMany(models.InventoryAnalytics, { foreignKey: 'productId', as: 'inventoryAnalytics' });

      Product.hasMany(models.Offers, { foreignKey: 'product_id', as: 'offers' });

//       Product.belongsTo(models.TaxCalculation, {
//      foreignKey: 'metalType',    // product.metalType
//      targetKey: 'metalType',     // taxCalculation.metalType
//       as: 'taxInfo'
// });

};

  return Product;
};
