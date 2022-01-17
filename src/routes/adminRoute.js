const router = require("express").Router();
const AdminController = require("../controllers/AdminController");
router.get("/", AdminController.getAdminDashboard);
router.get("/products", AdminController.getAdminProduct);
router.get("/products/add-product", AdminController.getAdminAddProduct);
router.get("/products/:id", AdminController.getAdminEditProduct);
module.exports = router;
