import express, { Request, Response } from "express";
const sharp = require("sharp");
const postsModel = require("../../dist/models/postsModel.js");
exports.uploadPostsController = async (req: any, res: Response) => {
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
      photoUrl = await postsModel.uploadImagePosts(
        user_id,
        req.file.originalname,
        croppedPhotoBuffer,
        random
      );
    }
    let updatePost = await postsModel.updatePost(
      user_id,
      title,
      location,
      description,
      photoUrl.data.publicUrl,
      req.file.originalname,
      random
    );
    if (updatePost.status === "SUCCESS") {
      res.status(200).json({
        message: "SUCCESS",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.getPostsController = async (req: any, res: Response) => {
  let { userId } = req.params;
  if (req.query.page !== "0") {
    let count = await postsModel.countPage();
    let getInfoPosts = await postsModel.getInfoPage(
      req.query.prePage,
      req.query.page
    );
    if (getInfoPosts.status === "SUCCESS") {
      return res.status(201).json({
        posts: getInfoPosts.posts,
        page_count: count.page_count,
      });
    }
  }
  let getPostByIdUser = await postsModel.getPostByIdUser(userId);
  if (getPostByIdUser.status === "ERROR") {
    res.status(404).json({
      message: "ERROR",
    });
  }
  if (getPostByIdUser.status === "SUCCESS") {
    return res.status(201).json({
      posts: getPostByIdUser.posts,
      page_count: getPostByIdUser.page_count,
    });
  }
};
exports.deletePostsController = async (req: Request, res: Response) => {
  let { id, imageName } = req.body;
  let { userId } = req.params;
  const deletePost = await postsModel.deletePostByIdUser(userId, imageName, id);
  if (deletePost.status === "SUCCESS") {
    return res.status(200).json({
      message: "SUCCESS",
    });
  }
};
exports.updatePostsController = async (req: any, res: Response) => {
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
      photoUrl = await postsModel.uploadImagePosts(
        user_id,
        req.file.originalname,
        croppedPhotoBuffer,
        random
      );
    }
    let updatePost = await postsModel.updatePostByIdUser(
      user_id,
      title,
      location,
      description,
      photoUrl,
      image,
      req.file !== undefined ? req.file.originalname : "",
      random,
      imageName,
      id
    );
    if (updatePost.status === "SUCCESS") {
      res.status(200).json({
        message: "SUCCESS",
      });
    }
    //  let updatePost = await supabase
    //    .from("posts")
    //    .update({
    //      user: user_id,
    //      title: title,
    //      location: location,
    //      description: description,
    //      image: photoUrl !== undefined ? photoUrl.data.publicUrl : image,
    //      imageName:
    //        req.file !== undefined
    //          ? `${req.file.originalname}_${random}`
    //          : imageName,
    //    })
    //    .eq("id", id)
    //    .single();
    //  res.status(200).json({
    //    message: "SUCCESS",
    //  });
  } catch (error) {
    console.log(error);
  }
};
