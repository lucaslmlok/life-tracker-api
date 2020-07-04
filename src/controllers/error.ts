import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const { statusCode, message, data } = error;
  res.status(statusCode || 500).json({ message, data });
};
