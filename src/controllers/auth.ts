import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User";
import { JWT_SECRET } from "../util/config";
import { signupMsg, loginMsg, generalMsg } from "../util/messages";

export const signup: RequestHandler = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error(signupMsg.validateFail);
      error["statusCode"] = 422;
      error["data"] = errors.array();
      throw error;
    }

    const { email, password, name } = req.body;
    const hashedPwd = await bcrypt.hash(password, 12);

    const user = await User.create({
      email,
      password: hashedPwd,
      name,
    });

    res.status(201).json({
      message: signupMsg.success,
      userId: user.get("id"),
    });
  } catch (err) {
    next(err);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error(generalMsg.wrongStructure);
      error["statusCode"] = 400;
      throw error;
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      const error = new Error(loginMsg.noUser);
      error["statusCode"] = 401;
      throw error;
    }

    const pwdEqual = await bcrypt.compare(
      password,
      <string>user.get("password")
    );
    if (!pwdEqual) {
      const error = new Error(loginMsg.wrongPwd);
      error["statusCode"] = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: user.get("email"),
        userId: user.get("id"),
      },
      JWT_SECRET
    );

    res.status(200).json({
      message: loginMsg.success,
      userId: user.get("id"),
      token,
    });
  } catch (err) {
    next(err);
  }
};
