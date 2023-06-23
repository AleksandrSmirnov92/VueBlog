import express from "express";

const router = express.Router();
const multer = require("multer");
let {
  updateUserProfile,
  getUserById,
} = require("../Controllers/UsersController");
let validationUpdateProfile = require("../../dist/ValidationShema/validationUpdateProfile.js");
const upload = multer({
  limits: { fieldSize: 2 * 1024 * 1024 },
});

router
  .route("/:id")
  .get(getUserById)
  .post(upload.single("image"), validationUpdateProfile, updateUserProfile);
module.exports = router;
