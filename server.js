const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const userController = require("./controllers/UserController");
const productTypeController = require("./controllers/ProductTypeController");
const materialController = require("./controllers/MaterialController");
const stockMaterialController = require("./controllers/StockMaterialController");
const packagingController = require("./controllers/PackagingController");
const productController = require("./controllers/ProductController");
const productFormularController = require("./controllers/ProductFormularController");
const productionPlanController = require("./controllers/ProductionPlanController");
const productionController = require("./controllers/ProductionController");
const reportController = require("./controllers/ReportController");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 
// report
//
app.post("/api/report/sumProductionPerDayInMonthAndYear", reportController.sumProductionPerDayInMonthAndYear);
app.post('/api/report/sumProductionPerMonthAndYear', reportController.sumProductionPerMonthAndYear);
app.post("/api/report/sumPriceStockMaterialPerYearAndMonth", reportController.sumPriceStockMaterialPerYearAndMonth);
app.post("/api/report/sumProductionPerYearAndMonth", reportController.sumProductionPerYearAndMonth);
app.post("/api/report/sumProductionPlanPerYearAndMonth", reportController.sumProductionPlanPerYearAndMonth);
app.get("/api/report/productsAndCost", reportController.productsAndCost);
app.post("/api/report/production", reportController.production);

//
// production
//
app.delete("/api/production/remove/:id", productionController.remove);
app.put("/api/production/update/:id", productionController.update);
app.post("/api/production/create", productionController.create);
app.get("/api/production/list/:productionPlanId", productionController.list);

//
// production plan
//
app.post("/api/productionPlan/create", productionPlanController.create);
app.put("/api/productionPlan/update/:id", productionPlanController.update);
app.delete("/api/productionPlan/remove/:id", productionPlanController.remove);
app.get("/api/productionPlan/list", productionPlanController.list);

// 
// product formular
//
app.post("/api/productFormular/create", productFormularController.create);
app.delete("/api/productFormular/remove/:formularId", productFormularController.remove);
app.put("/api/productFormular/update/:id", productFormularController.update);
app.get("/api/productFormular/list/:productId", productFormularController.list);

// 
// product
//
app.post("/api/product/create", productController.create);
app.put("/api/product/update/:id", productController.update);
app.delete("/api/product/remove/:id", productController.remove);
app.get("/api/product/list", productController.list);

//
// packaging
//
app.put("/api/packaging/update/:id", packagingController.update);
app.delete("/api/packaging/remove/:id", packagingController.remove);
app.get("/api/packaging/list", packagingController.list);
app.post("/api/packaging/create", packagingController.create);

//
// stock material
//
app.delete("/api/stockMaterial/remove/:id", stockMaterialController.remove);
app.get("/api/stockMaterial/list", stockMaterialController.list);
app.post("/api/stockMaterial/create", stockMaterialController.create);

//
// material
//
app.delete("/api/material/remove/:id", materialController.remove);
app.put("/api/material/update/:id", materialController.update);
app.post("/api/material/create", materialController.create);
app.get("/api/material/list", materialController.list);

//
// product type
//
app.delete("/api/productType/remove/:id", productTypeController.remove);
app.put("/api/productType/update/:id", productTypeController.update);
app.post("/api/productType/create", productTypeController.create);
app.get("/api/productType/list", productTypeController.list);

//
// user
//
app.put("/api/user/updateUser/:id", userController.updateUser);
app.get("/api/user/list", userController.list);
app.delete("/api/user/remove/:id", userController.remove);
app.post("/api/user/create", userController.create);
app.put("/api/user/update", userController.update);
app.get("/api/user/info", userController.info);
app.post("/api/user/signIn", userController.signIn);

app.listen(3001, '0.0.0.0', () => {
    console.log("Server running on port 3001");
});
