import express from "express";
const router = express.Router();
let { logoutController } = require("../Controllers/LogoutController");
router.route("/").post(logoutController);
module.exports = router;
