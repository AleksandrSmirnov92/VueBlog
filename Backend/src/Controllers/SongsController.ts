import express, { Request, Response } from "express";
const songsModel = require("../../dist/models/songsModel.js");
exports.songsController = async (req: any, res: Response) => {
  try {
    let { user_id, title } = req.body;
    if (!title) {
      return res.status(404).json({
        status: "title",
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
      let songs = await songsModel.uploadSongs(
        user_id,
        req.file.originalname,
        songBuffer,
        title
      );
      if (songs.status === "ERROR") {
        res.status(404).json({ message: songs.message });
      }
      if (songs.status === "SUCCESS") {
        return res.status(200).json({
          status: "SUCCESS",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
