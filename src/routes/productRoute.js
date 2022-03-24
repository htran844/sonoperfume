const router = require("express").Router();
const upload = require("../middlewares/uploadImg");
const productController = require("../controllers/ProductController");

router.post(
  "/api/create-product",
  upload.single("image"),
  productController.createProduct
);

router.put(
  "/api/update-product/:id",
  upload.single("image"),
  productController.updateProduct
);

router.delete("/api/delete-product/:id", productController.deleteProduct);
router.get("/api/change-status/:id", productController.changeStatus);
router.get("/api/get-one-by-id/:id", productController.getOneByID);
router.get("/api/get-all", productController.getAllProductAdmin);
router.get("/api/get-one-by-slug", productController.getOneBySlug);
router.get("/api/get-all-cart", productController.getAllCart);
module.exports = router;
