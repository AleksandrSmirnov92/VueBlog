import express, { Request, Response } from "express";
const sharp = require("sharp");
const usersModel = require("../../dist/models/usersModel.js");
exports.updateUserProfile = async (req: any, res: Response) => {
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
      photoUrl = await usersModel.uploadFotoProfil(
        req.file.originalname,
        croppedPhotoBuffer
      );
    }
    let updateUser = await usersModel.updateUser(
      id,
      first_name,
      last_name,
      location,
      description,
      photoUrl,
      image
    );
    if (updateUser.status === "SUCCESS") {
      res.status(200).json({
        message: "SUCCESS",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.getUserById = async (req: Request, res: Response) => {
  let { id } = req.params;
  let user = await usersModel.getUserById(id);
  if (user.status === "ERROR") {
    res.status(404).json({ message: "ERROR" });
  }
  if (user.status === "SUCCESS") {
    res.status(201).json({
      user: user.user,
    });
  }
};
