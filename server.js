const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const userController = require("./controllers/UserController");
const productTypeController = require("./controllers/ProductTypeController");
const materialController = require("./controllers/MaterialController");
const stockMaterialController = require("./controllers/StockMaterialController");
const packagingController = require("./controllers/PackagingController");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
app.put("/api/user/update", userController.update);
app.get("/api/user/info", userController.info);
app.post("/api/user/signIn", userController.signIn);

app.listen(3001, '0.0.0.0', () => {
    console.log("Server running on port 3001");
});
