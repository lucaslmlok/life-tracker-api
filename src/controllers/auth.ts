import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { Model } from "sequelize/types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User";
import { JWT_SECRET } from "../config";
import { signupMsg, loginMsg, generalMsg } from "../util/messages";

const generateToken = (user: Model<any, any>): string => {
  return jwt.sign(
    {
      email: user.get("email"),
      userId: user.get("id"),
    },
    JWT_SECRET
  );
};

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

    const token = generateToken(user);

    res.status(201).json({
      message: signupMsg.success,
      userId: user.get("id"),
      token,
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

    const token = generateToken(user);

    res.status(200).json({
      message: loginMsg.success,
      userId: user.get("id"),
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const checkToken: RequestHandler = (req, res, next) => {
  res.status(200).json({
    message: generalMsg.success,
    userId: req["userId"],
  });
};
