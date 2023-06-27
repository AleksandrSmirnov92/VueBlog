import express from "express";
const router = express.Router();
let {
  uploadVideoController,
  getVideoController,
  deleteVideoController,
} = require("../Controllers/VideosController");
router.route("/").post(uploadVideoController);
router.route("/:id").get(getVideoController);
router.route("/:videoId").delete(deleteVideoController);
module.exports = router;
