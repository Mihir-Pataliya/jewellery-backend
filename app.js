const express = require("express");
const app = express();
require("dotenv").config();
const sequelize = require("./db");


app.use(express.json());

const userRoutes=require('./routes/userRoutes')
app.use('/',userRoutes)

const categoryRoutes=require('./routes/categoryRoutes')
app.use('/',categoryRoutes)

const collectionRoutes=require('./routes/CollectionRoutes')
app.use('/',collectionRoutes)

const roleRoutes=require('./routes/rolesRoutes')
app.use('/',roleRoutes)

const designerCollectionRoutes=require('./routes/designercollectionroutes')
app.use('/',designerCollectionRoutes)

const stateRoutes=require('./routes/stateRoutes')
app.use('/',stateRoutes)

const cityRoutes=require('./routes/cityRoutes')
app.use('/',cityRoutes)

const tagRoutes=require('./routes/tagRoutes')
app.use('/',tagRoutes)

const productRoutes=require('./routes/productRoutes')
app.use('/',productRoutes)

const supplierRoutes=require('./routes/suppliersRoutes')
app.use('/',supplierRoutes)

const areaRoutes=require('./routes/areaRoutes')
app.use('/',areaRoutes)

const addressRoutes=require('./routes/addressRoutes')
app.use('/',addressRoutes)

const variantRoutes=require('./routes/variantRoutes')
app.use('/',variantRoutes)

const offerRoutes=require('./routes/offerRoutes')
app.use('/',offerRoutes)

const couponRoutes=require('./routes/couponRoutes')
app.use('/',couponRoutes)


sequelize
  .authenticate()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => console.error("❌ Database connection failed:", err));

  
  sequelize
  .sync()   
  .then(() => console.log("✅ User table is synced"))
  .catch(err => console.error("❌ Error syncing table:", err));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
