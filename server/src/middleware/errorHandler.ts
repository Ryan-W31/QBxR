import { ErrorRequestHandler } from "express";
import { INTERNAL_SERVER_ERROR } from "../contants/http";

// Middleware to handle errors
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(`PATH: ${req.path}`, err);

  return res.status(INTERNAL_SERVER_ERROR).send("Internal Server Error");
};

export default errorHandler;
