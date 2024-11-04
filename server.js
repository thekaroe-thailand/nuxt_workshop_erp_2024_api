const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const userController = require("./controllers/UserController");
const productTypeController = require("./controllers/ProductTypeController");
const materialController = require("./controllers/MaterialController");
const stockMaterialController = require("./controllers/StockMaterialController");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//
// stock material
//
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
