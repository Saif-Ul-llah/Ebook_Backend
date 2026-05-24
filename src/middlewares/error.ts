import { NextFunction, Request, Response } from "express";
import { HttpError } from "./../imports";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("ERROR DETAILS:", err);

  let error = { ...err };
  error.message = err.message;

  if (err.name === "CastError") {
    error = HttpError.invalidParameters(err.message);
  } else if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {}).join(", ") || "field";
    error = HttpError.alreadyExists(`Record with this ${field} already exists`);
  } else if (err.name === "ValidationError") {
    const message = Object.values(err.errors || {}).map(
      (val: any) => val.message
    );
    error = HttpError.validationError(message);
  } else if (err.code) {
    switch (err.code) {
      case "23505":
        error = HttpError.alreadyExists(`Record already exists`);
        break;
      case "23503":
        error = HttpError.referenceError(`Referenced record does not exist`);
        break;
      case "23514":
        error = HttpError.invalidParameters(`Data validation failed`);
        break;
      case "23502":
        error = HttpError.missingParameters(`Required data is missing`);
        break;
      case "08000":
      case "08003":
      case "08006":
      case "08001":
      case "08004":
        error = HttpError.databaseError(`Database connection issue`);
        break;

      case "22012":
        error = HttpError.invalidParameters(
          `Mathematical error: division by zero`
        );
        break;
      case "22001":
        error = HttpError.invalidParameters(`Input value too long`);
        break;
    }
  } else if (err instanceof HttpError) {
    error = err;
  } else if (!error.statusCode) {
    error = HttpError.databaseError("An unexpected error occurred");
  }

  res.status(error.statusCode || 500).json({
    success: false,
    code: error.code || "server-error",
    message: error.message || "Server error occurred",
  });
};

export { errorHandler };
