const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const userController = require("./controllers/UserController");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//
// user
//
app.post("/api/user/signIn", userController.signIn);

app.listen(3001, '0.0.0.0', () => {
    console.log("Server running on port 3001");
});
