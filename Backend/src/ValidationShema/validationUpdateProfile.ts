import express, { NextFunction, Request, Response } from "express";
module.exports = function validationUpdateProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("nene");
  let { first_name, last_name } = req.body;
  if (first_name.length > 10) {
    return res
      .status(400)
      .json({ message: "ERROR_FIRST_NAME", error: "Ваше имя слишком длинное" });
  }
  if (last_name.length > 20) {
    return res.status(400).json({
      message: "ERROR_LAST_NAME",
      error: "Вашa фамилия слишком длинная",
    });
  }
  next();
};
