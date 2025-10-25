const sequelize = require('../db'); 
const { DataTypes } = require('sequelize');

const State = require('./state')(sequelize, DataTypes);
const City = require('./city')(sequelize, DataTypes);
const Tag = require('./tag')(sequelize, DataTypes);
const Product = require('./product')(sequelize, DataTypes);
const ProductTags = require('./producttag')(sequelize, DataTypes);
const User = require('./user')(sequelize, DataTypes);
const Role = require('./role')(sequelize, DataTypes);
const Category = require('./category')(sequelize, DataTypes);
const Collection = require('./collection')(sequelize, DataTypes);
const DesignerCollection = require('./designercollection')(sequelize, DataTypes);
const Gift = require('./gift')(sequelize, DataTypes);
const Occasion = require('./occasion')(sequelize, DataTypes);
const Recipient = require('./recipient')(sequelize, DataTypes);
const Review = require('./review')(sequelize, DataTypes);
const ComboOffer = require('./combooffer')(sequelize, DataTypes);
const ComboOfferProducts = require('./comboOfferProduct')(sequelize, DataTypes);
const Stock = require('./stock')(sequelize, DataTypes);
const Wishlist = require('./wishlist')(sequelize, DataTypes);
const CartItem = require('./cartitem')(sequelize, DataTypes);
const ProductImage = require('./productimage')(sequelize, DataTypes);
const OrderItem = require('./orderitem')(sequelize, DataTypes);
const OrderReturn = require('./orderreturn')(sequelize, DataTypes);
const PurchaseOrderItem = require('./purchaseorderitem')(sequelize, DataTypes);
const StoreInventory = require('./stockinventory')(sequelize, DataTypes);
const ProductVideos = require('./productvideos')(sequelize, DataTypes);
const ProfitMargins = require('./profit')(sequelize, DataTypes);
const SalesReport = require('./salesreport')(sequelize, DataTypes);
const SeoMeta = require('./seometa')(sequelize, DataTypes);
const Solitaire = require('./solitare')(sequelize, DataTypes);
const SupplierProduct = require('./suppliersproduct')(sequelize, DataTypes);
const Variant = require('./variant')(sequelize, DataTypes);
const Certificate = require('./certificate')(sequelize, DataTypes);
const InventoryAnalytics = require('./inventoryAnalytic')(sequelize, DataTypes);
const Offers = require('./offers')(sequelize, DataTypes);
const Supplier = require('./suppliers')(sequelize, DataTypes);
const Address=require('./address')(sequelize,DataTypes);
const Area=require('./area')(sequelize,DataTypes);

State.associate({ City });
City.associate({ State });

Tag.associate({ Product, ProductTags, User });

Product.associate({ 
  Tag, ProductTags, Category, Collection, DesignerCollection,
  Gift, Occasion, Recipient, Review, ComboOffer, ComboOfferProducts, Stock, Wishlist,
  CartItem, ProductImage, OrderItem, OrderReturn, PurchaseOrderItem,
  StoreInventory, ProductVideos, ProfitMargins, SalesReport, SeoMeta, Solitaire,
  SupplierProduct, Variant, Certificate, InventoryAnalytics, Offers, Supplier
});

ProductTags.associate({ Product, Tag });
Address.associate({ User, Area });

module.exports = {
  sequelize,
  State,
  City,
  Tag,
  Product,
  ProductTags,
  Role,
  Category,
  Collection,
  DesignerCollection,
  Supplier,
  Gift,
  Occasion,
  Recipient,
  Review,
  ComboOffer,
  ComboOfferProducts,
  Stock,
  Wishlist,
  CartItem,
  ProductImage,
  OrderItem,
  OrderReturn,
  PurchaseOrderItem,
  StoreInventory,
  ProductVideos,
  ProfitMargins,
  SalesReport,
  SeoMeta,
  Solitaire,
  SupplierProduct,
  Variant,
  Certificate,
  InventoryAnalytics,
  Offers,
  Address,
  Area
};
