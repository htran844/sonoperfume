const router = require("express").Router();
const upload = require("../middlewares/uploadImg");
const productFullController = require("../controllers/ProductFullController");
const productController = require("../controllers/ProductController");
router.post("/api/create-productfull", productFullController.createProductFull);
router.post(
  "/api/create-product",
  upload.single("image"),
  productController.createProduct
);
router.put(
  "/api/update-productfull/:id",
  productFullController.updateProductFull
);
router.put(
  "/api/update-product/:id",
  upload.single("image"),
  productController.updateProduct
);
router.delete(
  "/api/delete-productfull/:id",
  productFullController.deleteProductFull
);
router.delete("/api/delete-product/:id", productController.deleteProduct);
router.get("/api/change-status/:id", productController.changeStatus);
router.get("/api/get-one-by-id/:id", productController.getOneByID);
module.exports = router;
