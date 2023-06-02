import express from "express";
const app = express();
const cors = require("cors");
const path = require("path");
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));
module.exports = app;
