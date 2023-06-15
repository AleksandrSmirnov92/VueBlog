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
const multer = require("multer");
const sharp = require("sharp");
const express_validator_1 = require("express-validator");
const { body, validationResult } = require("express-validator");
// validation
const validationCheck = require("../dist/ValidationShema/ValidationCheck.js");
//  /validation
require("dotenv").config();
const upload = multer({
    limits: { fieldSize: 2 * 1024 * 1024 },
});
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
const RegisterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    let { data } = yield DB_1.supabase
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
});
app.post("/register", (0, express_validator_1.check)("firstName", "Ошибка ввода данных").isString().exists(), (0, express_validator_1.check)("lastName", "Ошибка ввода данных").isString().exists(), (0, express_validator_1.check)("password", "Пароль должен быть не меньше 4 символов")
    .isString()
    .isLength({ min: 4, max: 10 })
    .exists(), (0, express_validator_1.check)("email", "Ошибка ввода email")
    .isEmail({})
    .isLength({ min: 10, max: 30 })
    .exists(), validationCheck, RegisterController);
const LoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password } = req.body;
    let { data, error } = yield DB_1.supabase
        .from("users")
        .select("id,email,password,first_name,last_name")
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
});
app.post("/login", (0, express_validator_1.check)("email", "Ошибка ввода email")
    .isEmail()
    .isLength({ min: 10, max: 30 })
    .exists(), (0, express_validator_1.check)("password", "Пароль должен быть не меньше 4 символов")
    .isLength({
    min: 4,
    max: 10,
})
    .exists(), validationCheck, LoginController);
//
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cookie = req.cookies["jwt"];
        const user = jwt.verify(cookie, process.env.SECRET_KEY);
        if (!user) {
            return res.status(401).json({ message: "Неавторизован" });
        }
        res.send(user);
    }
    catch (e) {
        return res.status(401).json({ message: "Неавторизован" });
    }
});
app.get("/profile", getProfile);
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Функция выхода
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
        message: "SUCCESS delete",
    });
});
app.post("/logout", logout);
app.put("/profile/:id", (req, res) => {
    let { id } = req.params;
    let { firstName } = req.body;
    console.log(id, firstName);
});
// upload profil
app.post("/users/:id", upload.single("image"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    let { left, top, width, height } = req.body;
    let { first_name, last_name, location, description, image } = req.body;
    let photoUrl;
    try {
        if (req.file) {
            let photoBuffer = req.file.buffer;
            const croppedPhotoBuffer = yield sharp(photoBuffer)
                .extract({
                left: parseInt(left),
                top: parseInt(top),
                width: parseInt(width),
                height: parseInt(height),
            })
                .toBuffer();
            const { data, error } = yield DB_1.supabase.storage
                .from("photos")
                .upload(`cropped_${req.file.originalname}`, croppedPhotoBuffer);
            // if (error) {
            //   throw error;
            // }
            photoUrl = DB_1.supabase.storage
                .from("photos")
                .getPublicUrl(`cropped_${req.file.originalname}`);
        }
        let updateUser = yield DB_1.supabase
            .from("users")
            .update({
            first_name: first_name,
            last_name: last_name,
            location: location,
            description: description,
            image: photoUrl ? photoUrl.data.publicUrl : image,
        })
            .eq("id", id)
            .single();
        res.status(200).json({
            message: "SUCCESS",
        });
    }
    catch (error) {
        console.log(error);
    }
}));
// /////////////////////////////////////
// get information about user profil
app.get("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    let { data } = yield DB_1.supabase
        .from("users")
        .select("id, first_name, last_name, location, description,image")
        .eq("id", id)
        .single();
    // console.log(data);
    res.status(201).json({
        user: data,
    });
}));
//
//
//
// upload songs
app.post("/songs", upload.single("song"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { user_id, title } = req.body;
        if (!title) {
            return res.status(404).json({
                message: "Введите заголовок",
            });
        }
        let songBuffer = req.file.buffer;
        let songUrl;
        if (!req.file) {
            return res.status(404).json({
                message: "Песня не загруженна",
            });
        }
        else {
            const { data, error } = yield DB_1.supabase.storage
                .from("songs")
                .upload(`user_${user_id}` + "/" + `song_${req.file.originalname}`, songBuffer);
            if (error) {
                console.log(error);
            }
            if (data) {
                songUrl = DB_1.supabase.storage
                    .from("songs")
                    .getPublicUrl(`user_${user_id}` + "/" + `song_${req.file.originalname}`);
                let { error } = yield DB_1.supabase
                    .from("songs")
                    .insert({
                    user: user_id,
                    title: title,
                    song: songUrl.data.publicUrl,
                })
                    .single();
                if (error) {
                    console.log(error);
                }
                if (data) {
                    return res.status(200).json({
                        status: "SUCCESS",
                    });
                }
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}));
//
//
//
// delete songs
app.post("/songs/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    // найти песню по индетификатору
    // если песня существует удалить песню
    // res.status(200).json({message:"Песня удалена"})
}));
module.exports = app;
