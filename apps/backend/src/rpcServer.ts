import express from "express";
import { JSONRPCServer } from "json-rpc-2.0";
import { register, login, logout } from "./controllers/authController";
import { isAuthenticated } from "./middlewares/authMiddleware";
import { getCurrentUser, getAllUsers } from "./controllers/protectedController";

const rpcServer = new JSONRPCServer();

interface RPCRequest {
  params: any;
  cookies: any;
}

interface RPCResponse {
  status: (code: number) => RPCResponse;
  json: (data: any) => any;
  sendStatus: (code: number) => any;
  send: (body: any) => any;
}

const wrapRequest = (params: any, cookies: any): express.Request => {
  return {
    body: params,
    cookies,
  } as express.Request;
};

const wrapResponse = (): RPCResponse => {
  const res: Partial<RPCResponse> = {
    status: (code) => {
      return {
        json: (data: any) => {
          return { statusCode: code, data };
        },
        status: code,
        sendStatus: (code: number) => ({ statusCode: code }),
        send: (body: any) => body,
      } as unknown as RPCResponse;
    },
  };
  return res as RPCResponse;
};

const authenticate = async (req: express.Request, res: RPCResponse): Promise<void> => {
  return new Promise((resolve, reject) => {
    isAuthenticated(req, res as express.Response, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

// Helper function to handle RPC methods with authentication
const createRPCMethod = (method: (req: express.Request, res: RPCResponse) => Promise<any>) => {
  return async (params: any, rawRequest: RPCRequest) => {
    const req = wrapRequest(params, rawRequest.cookies);
    const res = wrapResponse();
    return await method(req, res);
  };
};

// Register RPC methods
rpcServer.addMethod("register", createRPCMethod(register));
rpcServer.addMethod("login", createRPCMethod(login));
rpcServer.addMethod("logout", createRPCMethod(logout));

// Protected RPC methods
rpcServer.addMethod("getCurrentUser", async (params: any, rawRequest: RPCRequest) => {
  const req = wrapRequest(params, rawRequest.cookies);
  const res = wrapResponse();

  try {
    await authenticate(req, res);
    return await getCurrentUser(req, res as express.Response);
  } catch (error) {
    throw new Error("Unauthorized: Invalid token");
  }
});

rpcServer.addMethod("getAllUsers", async (params: any, rawRequest: RPCRequest) => {
  const req = wrapRequest(params, rawRequest.cookies);
  const res = wrapResponse();

  try {
    await authenticate(req, res);
    return await getAllUsers(req, res as express.Response);
  } catch (error) {
    throw new Error("Unauthorized: Invalid token");
  }
});

// Additional protected methods
const protectedMethods = ["getProfile", "getAdminPage", "getUserPage"];

protectedMethods.forEach((method) => {
  rpcServer.addMethod(method, async (params: any, rawRequest: RPCRequest) => {
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