import express from "express";
require("dotenv").config();
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
const VideoRouter = require("../dist/Routes/VideosRouter.js");
app.use("/youtube", VideoRouter);
const PostsRouter = require("../dist/Routes/PostsRouter.js");
app.use("/posts", PostsRouter);
const PostRouter = require("../dist/Routes/PostRouter.js");
app.use("/post", PostRouter);
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});
module.exports = app;
