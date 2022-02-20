const router = require("express").Router();
const PageController = require("../controllers/PageController");
router.get("/", PageController.getHome);
module.exports = router;
