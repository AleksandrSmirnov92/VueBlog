import express from "express";
const router = express.Router();
const validationRegister = require("../../dist/ValidationShema/validationRegister.js");
let { RegisterController } = require("../Controllers/RegisterController");
router.route("/").post(validationRegister, RegisterController);
module.exports = router;
