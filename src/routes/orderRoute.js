const router = require("express").Router();
const OrderController = require("../controllers/OrderController");
router.post("/api/create", OrderController.createOrder);
router.put("/api/update", OrderController.updateOrder);
router.get("/api/get-all", OrderController.getAllOrder);
module.exports = router;
