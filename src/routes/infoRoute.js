const router = require("express").Router();
const InfoController = require("../controllers/InfomationController");
const upload = require("../middlewares/uploadImg");
router.post(
  "/api/update-info",
  upload.array("images", 10),
  InfoController.updateInfo
);
module.exports = router;
