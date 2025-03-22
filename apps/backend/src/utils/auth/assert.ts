import assert from "node:assert";
import ErrorCodeType from "../../constants/error.code";
import { HttpStatusCode } from "../../constants/http";
import AppError from "../errors";


type AssertType = (
  condition: any,
  httpStatusCode: HttpStatusCode,
  message: string,
  ErrorCode?: ErrorCodeType
) => asserts condition;

const AppAssert: AssertType = (condition, httpStatusCode, message, ErrorCode) =>
  assert(condition, new AppError(httpStatusCode, message, ErrorCode));

export default AppAssert;
