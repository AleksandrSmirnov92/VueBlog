import express, { Request, Response } from "express";
const postModel = require("../../dist/models/postModel.js");
exports.getPostController = async (req: Request, res: Response) => {
  let { id } = req.params;
  let getPost = await postModel.getPost(id);
  if (getPost.status === "SUCCESS") {
    res.status(200).json({
      message: "SUCCESS",
      post: getPost.post,
    });
  }
};
