const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const userController = require("./controllers/UserController");
const productTypeController = require("./controllers/ProductTypeController");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
app.post("/api/user/signIn", userController.signIn);

app.listen(3001, '0.0.0.0', () => {
    console.log("Server running on port 3001");
});
