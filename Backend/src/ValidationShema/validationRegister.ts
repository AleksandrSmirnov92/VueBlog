import express, { NextFunction, Request, Response } from "express";
module.exports = function validationRegister(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { firstName, lastName, email, password, repeatPassword } = req.body;
  function validateEmail(email: string) {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  }

  if (!firstName) {
    return res
      .status(400)
      .json({ message: "ERROR_FIRST_NAME", error: "Это обязательное поле" });
  }
  if (!lastName) {
    return res
      .status(400)
      .json({ message: "ERROR_LAST_NAME", error: "Это обязательное поле" });
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
  if (!repeatPassword) {
    return res.status(400).json({
      message: "ERROR_REPEAT_PASSWORD",
      error: "Это обязательное поле",
    });
  }
  if (repeatPassword !== password) {
    return res.status(400).json({
      message: "ERROR_REPEAT_PASSWORD",
      error: "Пароль не совпадает",
    });
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

  next();
};
