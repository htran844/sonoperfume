const router = require("express").Router();
const PageController = require("../controllers/PageController");
router.get("/", PageController.getHome);
router.get("/products", PageController.getProducts);
router.get("/products/:slug", PageController.getOneProductBySlug);
router.get("/dang-ky", PageController.getSignUp);
router.get("/dang-nhap", PageController.getSignIn);
router.get("/lay-lai-pass", PageController.getLayPass);
router.get("/tai-khoan", PageController.getAccountPage);
router.get("/gio-hang", PageController.getCartPage);
router.get("/thanh-toan", PageController.getThanhToan);
module.exports = router;
