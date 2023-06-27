import express from "express";
const multer = require("multer");
const upload = multer({
  limits: { fieldSize: 2 * 1024 * 1024 },
});
const router = express.Router();

let {
  uploadSongsController,
  getSongsByIdController,
  deleteSongController,
} = require("../Controllers/SongsController");
router.route("/").post(upload.single("song"), uploadSongsController);
router.route("/:id").get(getSongsByIdController);
router.route("/:idUser").delete(deleteSongController);
module.exports = router;
