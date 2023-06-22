import express, { NextFunction, Request, Response } from "express";
module.exports = function validationLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;
  function validateEmail(email: string) {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  }
  if (!email) {
    return res
      .status(400)
      .json({ message: "ERROR_EMAIL", error: "Это обязательное поле" });
  }
  if (!validateEmail(email)) {
    return res
      .status(400)
      .json({ message: "ERROR_EMAIL", error: "Неправильно введет email" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ message: "ERROR_PASSWORD", error: "Это обязательное поле" });
  }
  if (password.length < 4) {
    return res.status(400).json({
      message: "ERROR_PASSWORD",
      error: "Пароль должен быть длинее 4 символов",
    });
  }
  next();
};
