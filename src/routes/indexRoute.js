const router = require("express").Router();
//product
const productRoute = require("./productRoute");
router.use("/product", productRoute);
module.exports = router;
