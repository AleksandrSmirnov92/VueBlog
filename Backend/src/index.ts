import { supabase } from "./config/DB";
import express, { Request, Response } from "express";
const multer = require("multer");
const sharp = require("sharp");
// import { check } from "express-validator";
// import { equal, notDeepStrictEqual } from "assert";
// const { body, validationResult } = require("express-validator");
// validation
// const validationCheck = require("../dist/ValidationShema/ValidationCheck.js");
const validationLogin = require("../dist/ValidationShema/ValidationLogin.js");
const validationRegister = require("../dist/ValidationShema/ValidationRegister.js");
//  /validation
// cutUrl
const cutUrl = require("../dist/helpers/cutUrl.js");
// /cuturl
require("dotenv").config();
const upload = multer({
  limits: { fieldSize: 2 * 1024 * 1024 },
});
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
    if (error.code === "23505") {
      return res.status(404).json({
        message: "ERROR_EMAIL",
        error: "такая почта уже существует",
      });
    } else {
      return res.status(404).json({
        status: "ERROR",
        error: error,
      });
    }
  }
  let { data } = await supabase
    .from("users")
    .select("id,email,password,first_name,last_name")
    .match({ email: email })
    .single();
  const token = jwt.sign({ _id: data.id }, process.env.SECRET_KEY);
  res.status(200).json({
    status: "SUCCESS",
    user: data,
    jwt: token,
  });
};
app.post("/register", validationRegister, RegisterController);

// Login
const LoginController = async (req: Request, res: Response) => {
  let { email, password } = req.body;
  let { data, error } = await supabase
    .from("users")
    .select("id,email,password,first_name,last_name")
    .match({ email: email })
    .single();
  if (error) {
    console.log("ошибка", error);
    return res
      .status(404)
      .json({ message: "ERROR_EMAIL", error: "Такого Email не сущетсвует" });
  }
  if (data) {
    if (!(await bcrypt.compare(password, data.password))) {
      res.status(404).json({
        message: "ERROR_PASSWORD",
        error: "Неверный пароль",
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
app.post("/login", validationLogin, LoginController);
const logoutController = async (req: Request, res: Response) => {
  res.cookie("jwt", "", { maxAge: 0 });
  return res.status(200).json({
    message: "Вы вышли из системы",
  });
};
app.post("/logout", logoutController);
//
//
//
//
//
//
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

// upload profil
app.post(
  "/users/:id",
  upload.single("image"),
  async (req: any, res: Response) => {
    let { id } = req.params;
    let { left, top, width, height } = req.body;
    let { first_name, last_name, location, description, image } = req.body;
    let photoUrl;
    try {
      if (req.file) {
        let photoBuffer = req.file.buffer;
        const croppedPhotoBuffer = await sharp(photoBuffer)
          .extract({
            left: parseInt(left),
            top: parseInt(top),
            width: parseInt(width),
            height: parseInt(height),
          })
          .toBuffer();

        const { data, error } = await supabase.storage
          .from("photos")
          .upload(`cropped_${req.file.originalname}`, croppedPhotoBuffer);
        // if (error) {
        //   throw error;
        // }
        photoUrl = supabase.storage
          .from("photos")
          .getPublicUrl(`cropped_${req.file.originalname}`);
      }

      let updateUser = await supabase
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
    } catch (error) {
      console.log(error);
    }
  }
);
// /////////////////////////////////////
// get information about user profil
app.get("/users/:id", async (req: Request, res: Response) => {
  let { id } = req.params;
  let { data, error } = await supabase
    .from("users")
    .select("id, first_name, last_name, location, description,image")
    .eq("id", id)
    .single();
  if (error) {
    res.status(404).json({ message: "ERROR" });
  }
  if (data) {
    res.status(201).json({
      user: data,
    });
  }
});
//
//
//
// upload songs
app.post("/songs", upload.single("song"), async (req: any, res: Response) => {
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
    } else {
      const { data, error } = await supabase.storage
        .from("songs")
        .upload(
          `user_${user_id}` + "/" + `song_${req.file.originalname}`,
          songBuffer
        );

      if (error) {
        console.log(error);
      }
      if (data) {
        songUrl = supabase.storage
          .from("songs")
          .getPublicUrl(
            `user_${user_id}` + "/" + `song_${req.file.originalname}`
          );
        let { error } = await supabase
          .from("songs")
          .insert({
            user: user_id,
            title: title,
            song: songUrl.data.publicUrl,
            songName: req.file.originalname,
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
  } catch (error) {
    console.log(error);
  }
});
//
//
//
//  songByUserController
app.get("/songs/:id", async (req: Request, res: Response) => {
  let { id } = req.params;
  let { data, error } = await supabase
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
});
// delete songController
app.delete("/songs/:idUser", async (req: Request, res: Response) => {
  let { id, songName } = req.body;
  let { idUser } = req.params;
  const { data, error } = await supabase.storage
    .from("songs")
    .remove([`user_${idUser}/song_${songName}`]);
  if (error) {
    console.log(error);
  }
  if (data) {
    const { error } = await supabase.from("songs").delete().eq("id", id);
    if (error) {
      console.log(error);
    }
    console.log("Песня успешно удаленна");
    return res.status(200).json({
      message: "SUCCESS",
    });
  }
});

//add  YouTube video
app.post("/youtube", async (req: Request, res: Response) => {
  try {
    let { user_id, title, url } = req.body;
    const currentUrl = `https://www.youtube.com/embed/${cutUrl(
      url
    )}?autoplay=0`;
    let { error } = await supabase.from("video").insert({
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
  } catch (error) {
    console.log(error);
  }
});
//get  YouTube video
app.get("/youtube/:id", async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    let { data, error } = await supabase
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
  } catch (error) {
    console.log(error);
  }
});
//delete  YouTube video
app.delete("/youtube/:videoId", async (req: Request, res: Response) => {
  // https://www.youtube.com/embed/${user_id}/?autoplay=0
  try {
    let { videoId } = req.params;
    const { error } = await supabase.from("video").delete().eq("id", videoId);
    if (error) {
      console.log(error);
    }
    console.log("Видео успешно удаленно");
    return res.status(200).json({
      message: "SUCCESS",
    });
  } catch (error) {
    console.log(error);
  }
});

//
//
app.post("/posts", upload.single("image"), async (req: any, res: Response) => {
  let { user_id, title, location, description, left, top, width, height } =
    req.body;
  let photoUrl;
  let random = Math.random();
  try {
    if (req.file) {
      let photoBuffer = req.file.buffer;
      const croppedPhotoBuffer = await sharp(photoBuffer)
        .extract({
          left: parseInt(left),
          top: parseInt(top),
          width: parseInt(width),
          height: parseInt(height),
        })
        .toBuffer();

      const { data, error } = await supabase.storage
        .from("posts")
        .upload(
          `user_${user_id}` + "/" + `post_${req.file.originalname}_${random}`,
          croppedPhotoBuffer
        );
      photoUrl = supabase.storage
        .from("posts")
        .getPublicUrl(
          `user_${user_id}` + "/" + `post_${req.file.originalname}_${random}`
        );
    }

    let updatePost = await supabase
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
  } catch (error) {
    console.log(error);
  }
});

app.get("/posts/:userId", async (req: Request, res: Response) => {
  let { userId } = req.params;

  if (req.query.page !== "0") {
    let count = await supabase.from("posts").select("*");
    let { data, error } = await supabase
      .from("posts")
      .select(
        "id, title, location, description,image,imageName, users (id,first_name,last_name,image)"
      )
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
  let { data, error } = await supabase
    .from("posts")
    .select(
      "id, title, location, description,image,imageName, users (id,first_name,last_name,image)"
    )
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
});
app.get("/post/:id", async (req: Request, res: Response) => {
  let { id } = req.params;
  let { data, error } = await supabase
    .from("posts")
    .select(
      "id, title, location, description,image,imageName, users (id,first_name,last_name,image)"
    )
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
});

// updatePost
app.post(
  "/posts/:id",
  upload.single("image"),
  async (req: any, res: Response) => {
    let {
      user_id,
      title,
      location,
      description,
      left,
      top,
      width,
      height,
      image,
      imageName,
    } = req.body;
    let { id } = req.params;
    let photoUrl;
    let random = Math.random();
    try {
      if (req.file) {
        let photoBuffer = req.file.buffer;
        const croppedPhotoBuffer = await sharp(photoBuffer)
          .extract({
            left: parseInt(left),
            top: parseInt(top),
            width: parseInt(width),
            height: parseInt(height),
          })
          .toBuffer();

        const { data, error } = await supabase.storage
          .from("posts")
          .upload(
            `user_${user_id}` + "/" + `post_${req.file.originalname}_${random}`,
            croppedPhotoBuffer
          );
        if (error) {
          console.log(error);
        }
        photoUrl = supabase.storage
          .from("posts")
          .getPublicUrl(
            `user_${user_id}` + "/" + `post_${req.file.originalname}_${random}`
          );
      }
      let updatePost = await supabase
        .from("posts")
        .update({
          user: user_id,
          title: title,
          location: location,
          description: description,
          image: photoUrl !== undefined ? photoUrl.data.publicUrl : image,
          imageName:
            req.file !== undefined
              ? `${req.file.originalname}_${random}`
              : imageName,
        })
        .eq("id", id)
        .single();
      res.status(200).json({
        message: "SUCCESS",
      });
    } catch (error) {
      console.log(error);
    }
  }
);
app.delete("/posts/:userId", async (req: Request, res: Response) => {
  let { id, imageName } = req.body;
  let { userId } = req.params;
  const { data, error } = await supabase.storage
    .from("posts")
    .remove([`user_${userId}/post_${imageName}`]);
  if (error) {
    console.log(error);
  }
  if (data) {
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) {
      console.log(error);
    }
    console.log("Пост успешно удален");
    return res.status(200).json({
      message: "SUCCESS",
    });
  }
});
module.exports = app;
