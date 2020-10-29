import jwt from "jsonwebtoken";
import { RequestHandler } from "express";

import { generalMsg } from "../util/messages";
import { JWT_SECRET } from "../config";

export const isAuth: RequestHandler = (req, res, next) => {
  const token = req.get("Authorization");
  if (!token) {
    const error = new Error(generalMsg.noAuth);
    error["statusCode"] = 401;
    throw error;
  }

  let decodedToken: any;

  try {
    decodedToken = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    error["statusCode"] = 500;
    throw error;
  }

  if (!decodedToken) {
    const error = new Error(generalMsg.noAuth);
    error["statusCode"] = 401;
    throw error;
  }

  req["userId"] = decodedToken.userId;
  next();
};
