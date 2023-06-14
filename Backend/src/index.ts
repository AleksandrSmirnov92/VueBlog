import { supabase } from "./config/DB";
import express, { Request, Response } from "express";
const multer = require("multer");
import { check } from "express-validator";
const { body, validationResult } = require("express-validator");
const validationCheck = require("../dist/ValidationShema/ValidationLogin.js");
require("dotenv").config();
const upload = multer();
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

const RegisterController = async (req: Request, res: Response) => {
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
    image: null,
    location: null,
    description: null,
  });
  if (error) {
    console.log(error);
    res.status(404).json({
      status: "ERROR",
      message: error.message,
    });
  }
  let { data } = await supabase
    .from("users")
    .select("id,email,password,first_name,last_name")
    .match({ email: email })
    .single();
  // console.log(data);
  const token = jwt.sign({ _id: data.id }, process.env.SECRET_KEY);
  res.status(200).json({
    status: "SUCCESS",
    user: data,
    jwt: token,
  });
};
app.post(
  "/register",
  check("firstName", "Ошибка ввода данных").isString().exists(),
  check("lastName", "Ошибка ввода данных").isString().exists(),
  check("password", "Пароль должен быть не меньше 4 символов")
    .isString()
    .isLength({ min: 4, max: 10 })
    .exists(),
  check("email", "Ошибка ввода email")
    .isEmail({})
    .isLength({ min: 10, max: 30 })
    .exists(),
  validationCheck,
  RegisterController
);
const LoginController = async (req: Request, res: Response) => {
  let { email, password } = req.body;
  let { data, error } = await supabase
    .from("users")
    .select("id,email,password,first_name,last_name")
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
app.post(
  "/login",
  check("email", "Ошибка ввода email")
    .isEmail()
    .isLength({ min: 10, max: 30 })
    .exists(),
  check("password", "Пароль должен быть не меньше 4 символов")
    .isLength({
      min: 4,
      max: 10,
    })
    .exists(),
  validationCheck,
  LoginController
);

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
app.put("/profile/:id", (req: Request, res: Response) => {
  let { id } = req.params;
  let { firstName } = req.body;
  console.log(id, firstName);
});
app.put("/users/:id", upload.none(), async (req: Request, res: Response) => {
  let { id } = req.params;
  let formData = req.body;
  let { first_name, last_name, location, description } = formData;
  console.log(formData);
  let updateUser = await supabase
    .from("users")
    .update({
      first_name: first_name,
      last_name: last_name,
      location: location,
      description: description,
    })
    .eq("id", id)
    .single();
  app.get("/users/:id", upload.none(), async (req: Request, res: Response) => {
    let { id } = req.params;
    // let formData = req.body;
    // let { first_name, last_name, location, description } = formData;
    console.log(formData);
    let { data } = await supabase
      .from("users")
      .select("id,first_name", "last_name", "location", "description")
      .eq("id", id)
      .single();
    console.log(data);
    // res.status(201).json({
    //   user: data,
    // });
  });
});
module.exports = app;
