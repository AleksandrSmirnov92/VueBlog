import express, { Request, Response } from "express";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerModel = require("../../dist/models/registerModel.js");
exports.RegisterController = async (req: Request, res: Response) => {
  let { firstName, lastName, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = {
    firstName,
    lastName,
    email,
    password: hashedPassword,
  };
  let register = await registerModel.register(newUser);
  if (register.status === "ERROR") {
    return res.status(404).json(register);
  }
  if (register.status === "SUCCESS") {
    console.log(register);
    const token = jwt.sign({ _id: register.user.id }, process.env.SECRET_KEY);
    res.status(200).json({
      user: register.user,
      jwt: token,
    });
  }
};
