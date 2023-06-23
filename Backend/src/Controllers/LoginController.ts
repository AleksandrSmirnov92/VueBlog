import express, { Request, Response } from "express";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const loginModel = require("../../dist/models/loginModel.js");
exports.LoginController = async (req: Request, res: Response) => {
  let { email, password } = req.body;
  const login = await loginModel.login(email);
  if (login.status === "ERROR") {
    return res.status(404).json(login);
  }
  if (login.status === "SUCCESS") {
    if (!(await bcrypt.compare(password, login.data.password))) {
      res.status(404).json({
        message: "ERROR_PASSWORD",
        error: "Неверный пароль",
      });
    } else {
      const token = jwt.sign({ _id: login.data.id }, process.env.SECRET_KEY);
      res
        .status(200)
        .cookie("jwt", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        })
        .json({
          status: "SUCCESS",
          user: login.data,
          jwt: token,
        });
    }
  }
};
