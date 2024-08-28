import AppErrorCode from "../contants/appErrorCode";
import { HTTPStatusCode } from "../contants/http";

class AppError extends Error {
  constructor(
    public statusCode: HTTPStatusCode,
    public message: string,
    public errorCode?: AppErrorCode
  ) {
    super(message);
  }
}

export default AppError;
