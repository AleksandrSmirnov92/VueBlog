"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("./config/DB");
const express_1 = __importDefault(require("express"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = (0, express_1.default)();
const cors = require("cors");
const path = require("path");
app.use(express_1.default.json());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:5173"],
}));
app.use(cookieParser());
app.use(express_1.default.static(path.join(__dirname, "../public")));
const AuthController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { firstName, lastName, email, password } = req.body;
    const salt = yield bcrypt.genSalt(10);
    const hashedPassword = yield bcrypt.hash(password, salt);
    const newUser = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
    };
    let { error } = yield DB_1.supabase.from("users").insert({
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
});
app.post("/register", AuthController);
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password } = req.body;
    let { data, error } = yield DB_1.supabase
        .from("users")
        .select("id,email,password")
        .match({ email: email })
        .single();
    if (error) {
        console.log("ошибка", error);
    }
    if (data) {
        if (!(yield bcrypt.compare(password, data.password))) {
            res.status(404).json({
                status: "ERROR",
                message: "Учетные данные не верны",
            });
        }
        else {
            const token = jwt.sign({ _id: data.id }, "secret");
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
});
app.post("/login", login);
//
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookie = req.cookies["jwt"];
    res.send(cookie);
});
app.get("/profile", getProfile);
module.exports = app;
