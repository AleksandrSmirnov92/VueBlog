import express, { Request, Response } from "express";
const songsModel = require("../../dist/models/songsModel.js");
exports.uploadSongsController = async (req: any, res: Response) => {
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
exports.getSongsByIdController = async (req: Request, res: Response) => {
  let { id } = req.params;
  let getSong = await songsModel.getSongsById(id);
  if (getSong.status === "ERROR") {
    return res.status(200).json({
      message: getSong.message,
    });
  }
  if (getSong.status === "SUCCESS") {
    return res.status(200).json({
      songs: getSong.songs,
    });
  }
};
exports.deleteSongController = async (req: Request, res: Response) => {
  let { id, songName } = req.body;
  let { idUser } = req.params;
  let deleteSong = await songsModel.deleteSongByid(idUser, songName, id);
  if (deleteSong.status === "SUCCESS") {
    return res.status(200).json({
      message: "SUCCESS",
    });
  }
};
