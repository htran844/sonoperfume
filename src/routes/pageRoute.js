const router = require("express").Router();
const PageController = require("../controllers/PageController");
router.get("/", PageController.getHome);
router.get("/products", PageController.getProducts);
router.get("/products/:slug", PageController.getOneProductBySlug);
module.exports = router;
