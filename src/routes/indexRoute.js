const router = require("express").Router();
//product
const productRoute = require("./productRoute");
router.use("/product", productRoute);
const adminRoute = require("./adminRoute");
router.use("/admin", adminRoute);
const accountRoute = require("./accountRoute");
router.use("/account", accountRoute);
const infoRoute = require("./infoRoute");
router.use("/info", infoRoute);
module.exports = router;
