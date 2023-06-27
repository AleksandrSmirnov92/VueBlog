import express from "express";
const router = express.Router();
const multer = require("multer");
const upload = multer({
  limits: { fieldSize: 2 * 1024 * 1024 },
});

let {
  uploadPostsController,
  getPostsController,
  deletePostsController,
  updatePostsController,
} = require("../Controllers/PostsController");
router.route("/").post(upload.single("image"), uploadPostsController);
router.route("/:userId").get(getPostsController).delete(deletePostsController);
router.route("/:id").post(upload.single("image"), updatePostsController);
module.exports = router;
