import express, { Request, Response } from "express";
exports.logoutController = async (req: Request, res: Response) => {
  res.cookie("jwt", "", { maxAge: 0 });
  return res.status(200).json({
    message: "Вы вышли из системы",
  });
};
