import AppErrorCode from "../constants/appErrorCode";
import { HTTPStatusCode } from "../constants/http";

class AppError extends Error {
  constructor(public statusCode: HTTPStatusCode, public message: string, public errorCode?: AppErrorCode) {
    super(message);
  }
}

export default AppError;
