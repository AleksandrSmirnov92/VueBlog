import express from "express";
const router = express.Router();
const validationLogin = require("../../dist/ValidationShema/ValidationLogin.js");
let { LoginController } = require("../Controllers/LoginController");
router.route("/").post(validationLogin, LoginController);
module.exports = router;
