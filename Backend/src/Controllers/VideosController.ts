import express, { Request, Response } from "express";
const videoModel = require("../../dist/models/VideosModel.js");
const cutUrl = require("../../dist/helpers/cutUrl.js");
exports.uploadVideoController = async (req: Request, res: Response) => {
  try {
    let { user_id, title, url } = req.body;
    if (!title) {
      res.status(404).json({
        status: "ERROR_TITLE",
        message: "Это обязательное поле для заполнение",
      });
    }
    const currentUrl = `https://www.youtube.com/embed/${cutUrl(
      url
    )}?autoplay=0`;
    let addVideo = await videoModel.addVideo(user_id, title, currentUrl);
    if ((addVideo.status = "SUCCESS")) {
      res.status(200).json({
        status: "SUCCESS",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.getVideoController = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    let getVideo = await videoModel.getVideo(id);
    if (getVideo.status === "ERROR") {
      return res.status(404).json({
        message: "ERROR",
        error: getVideo.error,
      });
    }
    if (getVideo.status === "SUCCESS") {
      res.status(200).json({
        videos: getVideo.videos,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.deleteVideoController = async (req: Request, res: Response) => {
  try {
    let { videoId } = req.params;
    const deleteVideo = await videoModel.deleteVideo(videoId);
    if (deleteVideo.status === "SUCCESS") {
      return res.status(200).json({ message: "SUCCESS" });
    }
  } catch (error) {
    console.log(error);
  }
};
