import express from "express";
const multer = require("multer");
const upload = multer({
  limits: { fieldSize: 2 * 1024 * 1024 },
});
const router = express.Router();

let { songsController } = require("../Controllers/SongsController");
router.route("/").post(upload.single("song"), songsController);
module.exports = router;
