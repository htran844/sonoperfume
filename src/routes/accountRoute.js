const router = require("express").Router();
const AccountController = require("../controllers/AccountController");
router.post("/api/create-account", AccountController.createAccount);
router.get("/api/get-all", AccountController.getListAccount);
router.get("/api/get-one/:id", AccountController.getOneAccountByID);
module.exports = router;
