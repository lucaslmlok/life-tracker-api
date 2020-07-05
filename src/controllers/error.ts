import { ErrorRequestHandler } from "express";
import { generalMsg } from "../util/messages";

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let { statusCode, message, data } = error;

  if (!statusCode) statusCode = 500;
  if (!message && statusCode === 500) message = generalMsg.serverErr;

  res.status(statusCode).json({ message, data });
};
