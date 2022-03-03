const router = require("express").Router();
const BrandController = require("../controllers/BrandController");
router.post("/api/create-brand", BrandController.createBrand);
router.delete("/api/delete-brand", BrandController.deleteBrand);
module.exports = router;
