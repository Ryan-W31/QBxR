import assert from "node:assert";
import AppError from "./AppError";
import { HTTPStatusCode } from "../contants/http";
import AppErrorCode from "../contants/appErrorCode";

type AppAssert = (
  condition: any,
  httpStatusCode: HTTPStatusCode,
  message: string,
  appErrorCode?: AppErrorCode
) => asserts condition;
/**
 * Asserts a condition and throws an AppError if the condition is falsy.
 */
const appAssert: AppAssert = (
  condition,
  httpStatusCode,
  message,
  appErrorCode
) => assert(condition, new AppError(httpStatusCode, message, appErrorCode));

export default appAssert;
