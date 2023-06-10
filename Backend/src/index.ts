import { supabase } from "./config/DB";
import express, { Request, Response } from "express";
require("dotenv").config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();

const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

const AuthController = async (req: Request, res: Response) => {
  let { firstName, lastName, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = {
    firstName,
    lastName,
    email,
    password: hashedPassword,
  };
  let { error } = await supabase.from("users").insert({
    first_name: newUser.firstName,
    last_name: newUser.lastName,
    email: newUser.email,
    password: newUser.password,
  });
  if (error) {
    console.log(error);
    res.status(404).json({
      status: "ERROR",
      message: error.message,
    });
  }
  res.status(200).json({
    status: "SUCCESS",
  });
};
app.post("/register", AuthController);
const login = async (req: Request, res: Response) => {
  let { email, password } = req.body;
  let { data, error } = await supabase
    .from("users")
    .select("id,email,password")
    .match({ email: email })
    .single();
  if (error) {
    console.log("ошибка", error);
  }
  if (data) {
    if (!(await bcrypt.compare(password, data.password))) {
      res.status(404).json({
        status: "ERROR",
        message: "Учетные данные не верны",
      });
    } else {
      const token = jwt.sign({ _id: data.id }, process.env.SECRET_KEY);
      res
        .status(200)
        .cookie("jwt", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        })
        .json({
          status: "SUCCESS",
          user: data,
          jwt: token,
        });
    }
  }
};
app.post("/login", login);

//
const getProfile = async (req: Request, res: Response) => {
  try {
    const cookie = req.cookies["jwt"];
    const user = jwt.verify(cookie, process.env.SECRET_KEY);
    if (!user) {
      return res.status(401).json({ message: "Неавторизован" });
    }
    res.send(user);
  } catch (e) {
    return res.status(401).json({ message: "Неавторизован" });
  }
};
app.get("/profile", getProfile);

const logout = async (req: Request, res: Response) => {
  // Функция выхода
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({
    message: "SUCCESS delete",
  });
};
app.post("/logout", logout);
module.exports = app;
