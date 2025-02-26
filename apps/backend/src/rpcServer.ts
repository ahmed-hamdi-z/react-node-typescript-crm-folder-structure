// rpcServer.ts
import { JSONRPCServer } from "json-rpc-2.0";
import { register, login, logout } from "./controllers/authController";
import { verifyTokenMiddleware } from "./middlewares/authMiddleware";
import { Request, Response } from "express";
import { getUserPage } from "./controllers/protectedController";

const rpcServer = new JSONRPCServer();

const wrapRequest = (params: any, cookies: any): Request => {
  return {
    body: params,
    cookies,
  } as Request;
};

const wrapResponse = (): Response => {
  const res: Partial<Response> = {
    status: (code: number) => {
      return {
        json: (data: any) => {
          return { statusCode: code, data };
        },
        status: code,
        sendStatus: (code: number) => ({ statusCode: code }),
        send: (body: any) => body,
      } as unknown as Response;
    },
  };
  return res as Response;
};

const authenticate = async (req: Request, res: Response) => {
  return new Promise<void>((resolve, reject) => {
    verifyTokenMiddleware(req, res, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

rpcServer.addMethod("register", async (params, rawRequest: any) => {
  const req = wrapRequest(params, rawRequest.cookies);
  const res = wrapResponse();
  return await register(req, res);
});

rpcServer.addMethod("login", async (params, rawRequest: any) => {
  const req = wrapRequest(params, rawRequest.cookies);
  const res = wrapResponse();
  return await login(req, res);
});

rpcServer.addMethod("logout", async (_, rawRequest: any) => {
  const req = wrapRequest({}, rawRequest.cookies);
  const res = wrapResponse();
  return await logout(req, res);
});

rpcServer.addMethod("getUserPage", async (params, rawRequest: any) => {
  const req = wrapRequest(params, rawRequest.cookies);
  const res = wrapResponse();

  try {
    await authenticate(req, res);
    return await getUserPage(req, res);
  } catch (error) {
    throw new Error("Unauthorized: Invalid token");
  }
});

const protectedMethods = ["getProfile", "getAdminPage", "getUserPage"];

protectedMethods.forEach((method) => {
  rpcServer.addMethod(method, async (params, rawRequest: any) => {
    const req = wrapRequest(params, rawRequest.cookies);
    const res = wrapResponse();

    try {
      await authenticate(req, res);

      switch (method) {
        case "getProfile":
          return { message: "Profile data" };
        case "getAdminPage":
          return { message: "Admin page data" };
        case "getUserPage":
          return { message: "User page data" };
        default:
          throw new Error("Method not found");
      }
    } catch (error) {
      throw new Error("Unauthorized: Invalid token");
    }
  });
});

export default rpcServer;