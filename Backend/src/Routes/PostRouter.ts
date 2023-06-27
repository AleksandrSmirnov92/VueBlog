import express from "express";
const router = express.Router();
let { getPostController } = require("../Controllers/PostController");
router.route("/:id").get(getPostController);
module.exports = router;
