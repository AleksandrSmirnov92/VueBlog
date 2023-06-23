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
// import { check } from "express-validator";
// import { equal, notDeepStrictEqual } from "assert";
// const { body, validationResult } = require("express-validator");
// validation
// const validationCheck = require("../dist/ValidationShema/ValidationCheck.js");
// const validationLogin = require("../dist/ValidationShema/ValidationLogin.js");
// const validationRegister = require("../dist/ValidationShema/ValidationRegister.js");
//  /validation
// cutUrl
const cutUrl = require("../dist/helpers/cutUrl.js");
// /cuturl
require("dotenv").config();
const upload = multer({
    limits: { fieldSize: 2 * 1024 * 1024 },
});
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
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
const RegisterRouter = require("../dist/Routes/RegisterRouter.js");
app.use("/register", RegisterRouter);
const LoginRouter = require("../dist/Routes/LoginRouter.js");
app.use("/login", LoginRouter);
const Logout = require("../dist/Routes/LogoutRouter.js");
app.use("/logout", Logout);
const UsersRouter = require("../dist/Routes/UsersRouter.js");
app.use("/users", UsersRouter);
const SongsRouter = require("../dist/Routes/SongsRouter.js");
app.use("/songs", SongsRouter);
//  songByUserController
app.get("/songs/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    let { data, error } = yield DB_1.supabase
        .from("songs")
        .select("id,user,title,song,songName")
        .eq("user", id);
    if (error) {
        console.log(error);
        return res.status(404).json({
            message: error,
        });
    }
    if (data) {
        return res.status(200).json({
            songs: data,
        });
    }
}));
// delete songController
app.delete("/songs/:idUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id, songName } = req.body;
    let { idUser } = req.params;
    const { data, error } = yield DB_1.supabase.storage
        .from("songs")
        .remove([`user_${idUser}/song_${songName}`]);
    if (error) {
        console.log(error);
    }
    if (data) {
        const { error } = yield DB_1.supabase.from("songs").delete().eq("id", id);
        if (error) {
            console.log(error);
        }
        console.log("Песня успешно удаленна");
        return res.status(200).json({
            message: "SUCCESS",
        });
    }
}));
//add  YouTube video
app.post("/youtube", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { user_id, title, url } = req.body;
        const currentUrl = `https://www.youtube.com/embed/${cutUrl(url)}?autoplay=0`;
        let { error } = yield DB_1.supabase.from("video").insert({
            user: user_id,
            title: title,
            url: currentUrl,
        });
        if (error) {
            return console.log(error);
        }
        res.status(200).json({
            message: "SUCCESS",
        });
    }
    catch (error) {
        console.log(error);
    }
}));
//get  YouTube video
app.get("/youtube/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        let { data, error } = yield DB_1.supabase
            .from("video")
            .select("id,user,title,url")
            .eq("user", id);
        if (error) {
            return res.status(404).json({
                message: "ERROR",
                error: error,
            });
        }
        if (data) {
            res.status(200).json({
                videos: data,
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}));
//delete  YouTube video
app.delete("/youtube/:videoId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // https://www.youtube.com/embed/${user_id}/?autoplay=0
    try {
        let { videoId } = req.params;
        const { error } = yield DB_1.supabase.from("video").delete().eq("id", videoId);
        if (error) {
            console.log(error);
        }
        console.log("Видео успешно удаленно");
        return res.status(200).json({
            message: "SUCCESS",
        });
    }
    catch (error) {
        console.log(error);
    }
}));
//
//
app.post("/posts", upload.single("image"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { user_id, title, location, description, left, top, width, height } = req.body;
    let photoUrl;
    let random = Math.random();
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
                .from("posts")
                .upload(`user_${user_id}` + "/" + `post_${req.file.originalname}_${random}`, croppedPhotoBuffer);
            photoUrl = DB_1.supabase.storage
                .from("posts")
                .getPublicUrl(`user_${user_id}` + "/" + `post_${req.file.originalname}_${random}`);
        }
        let updatePost = yield DB_1.supabase
            .from("posts")
            .insert({
            user: user_id,
            title: title,
            location: location,
            description: description,
            image: photoUrl.data.publicUrl,
            imageName: `${req.file.originalname}_${random}`,
        })
            .single();
        res.status(200).json({
            message: "SUCCESS",
        });
    }
    catch (error) {
        console.log(error);
    }
}));
app.get("/posts/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { userId } = req.params;
    if (req.query.page !== "0") {
        let count = yield DB_1.supabase.from("posts").select("*");
        let { data, error } = yield DB_1.supabase
            .from("posts")
            .select("id, title, location, description,image,imageName, users (id,first_name,last_name,image)")
            // .eq("user", userId)
            .range(req.query.prePage, Number(req.query.page) - 1);
        if (error) {
            console.log(error);
        }
        if (data) {
            return res.status(201).json({
                posts: data,
                page_count: count.data.length,
            });
        }
    }
    let { data, error } = yield DB_1.supabase
        .from("posts")
        .select("id, title, location, description,image,imageName, users (id,first_name,last_name,image)")
        .eq("user", userId);
    if (error) {
        console.log(error);
        res.status(404).json({
            message: "ERROR",
        });
    }
    if (data) {
        return res.status(201).json({
            posts: data,
            page_count: data.length,
        });
    }
}));
app.get("/post/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    let { data, error } = yield DB_1.supabase
        .from("posts")
        .select("id, title, location, description,image,imageName, users (id,first_name,last_name,image)")
        .eq("id", id)
        .single();
    if (error) {
        console.log(error);
        res.status(404).json({
            message: "ERROR",
        });
    }
    if (data) {
        res.status(200).json({
            message: "SUCCESS",
            post: data,
        });
    }
}));
// updatePost
app.post("/posts/:id", upload.single("image"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { user_id, title, location, description, left, top, width, height, image, imageName, } = req.body;
    let { id } = req.params;
    let photoUrl;
    let random = Math.random();
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
                .from("posts")
                .upload(`user_${user_id}` + "/" + `post_${req.file.originalname}_${random}`, croppedPhotoBuffer);
            if (error) {
                console.log(error);
            }
            photoUrl = DB_1.supabase.storage
                .from("posts")
                .getPublicUrl(`user_${user_id}` + "/" + `post_${req.file.originalname}_${random}`);
        }
        let updatePost = yield DB_1.supabase
            .from("posts")
            .update({
            user: user_id,
            title: title,
            location: location,
            description: description,
            image: photoUrl !== undefined ? photoUrl.data.publicUrl : image,
            imageName: req.file !== undefined
                ? `${req.file.originalname}_${random}`
                : imageName,
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
app.delete("/posts/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id, imageName } = req.body;
    let { userId } = req.params;
    const { data, error } = yield DB_1.supabase.storage
        .from("posts")
        .remove([`user_${userId}/post_${imageName}`]);
    if (error) {
        console.log(error);
    }
    if (data) {
        const { error } = yield DB_1.supabase.from("posts").delete().eq("id", id);
        if (error) {
            console.log(error);
        }
        console.log("Пост успешно удален");
        return res.status(200).json({
            message: "SUCCESS",
        });
    }
}));
// const getProfile = async (req: Request, res: Response) => {
//   try {
//     const cookie = req.cookies["jwt"];
//     const user = jwt.verify(cookie, process.env.SECRET_KEY);
//     if (!user) {
//       return res.status(401).json({ message: "Неавторизован" });
//     }
//     res.send(user);
//   } catch (e) {
//     return res.status(401).json({ message: "Неавторизован" });
//   }
// };
// app.get("/profile", getProfile);
// const logout = async (req: Request, res: Response) => {
//   // Функция выхода
//   res.cookie("jwt", "", { maxAge: 0 });
//   res.status(200).json({
//     message: "SUCCESS delete",
//   });
// };
// app.post("/logout", logout);
// app.put("/profile/:id", (req: Request, res: Response) => {
//   let { id } = req.params;
//   let { firstName } = req.body;
//   console.log(id, firstName);
// });
module.exports = app;
