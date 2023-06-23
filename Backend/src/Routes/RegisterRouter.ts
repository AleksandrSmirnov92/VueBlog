import express from "express";
const router = express.Router();
const validationRegister = require("../../dist/ValidationShema/ValidationRegister.js");
let { RegisterController } = require("../Controllers/RegisterController");
router.route("/").post(validationRegister, RegisterController);
module.exports = router;
