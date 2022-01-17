const router = require("express").Router();
//product
const productRoute = require("./productRoute");
router.use("/product", productRoute);
const adminRoute = require("./adminRoute");
router.use("/admin", adminRoute);
module.exports = router;
