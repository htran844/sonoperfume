const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
// use evn
require("dotenv").config();
const cookieParser = require("cookie-parser");
const path = require("path");
// add middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
// setup view
app.set("view engine", "ejs");
app.set("views", "./src/views");

// setup public folder
app.use("/public", express.static(path.join(__dirname, "/src/public")));
//conect db
require("./src/configs/connectDB");

const router = require("./src/routes/indexRoute");
app.use(router);
//listen
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
