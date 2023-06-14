import express, { NextFunction, Request, Response } from "express";
const { check, validationResult } = require("express-validator");
module.exports = function validationCheck(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({
      status: "ErrorValidation",
      errors: err.array(),
    });
  }
  next();
};
