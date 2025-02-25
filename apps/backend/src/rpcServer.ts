import { JSONRPCServer } from "json-rpc-2.0";
import { register, login, logout } from "./controllers/authController";
import { verifyToken } from "./middleware/authMiddleware";
import { Request, Response } from "express";
import { getUserPage } from "./controllers/protectedController";

// Create a JSON-RPC server
const rpcServer = new JSONRPCServer();

// Helper function to wrap Express request/response into RPC methods
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
        status: code, // Add the status property
        sendStatus: (code: number) => ({ statusCode: code }), // Mock sendStatus
        send: (body: any) => body, // Mock send
        // Add other required properties and methods here
      } as unknown as Response;
    },
  };
  return res as Response;
};
// Middleware to verify token
const authenticate = async (req: Request, res: Response) => {
  return new Promise<void>((resolve, reject) => {
    verifyToken(req, res, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

// Register JSON-RPC methods
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
    // Verify the token before proceeding
    await authenticate(req, res);

    // Call the getUserPage method from the protectedController
    return await getUserPage(req, res);
  } catch (error) {
    throw new Error("Unauthorized: Invalid token");
  }
});

// Protected methods (require authentication)
const protectedMethods = ["getProfile", "getAdminPage", "getUserPage"];

protectedMethods.forEach((method) => {
  rpcServer.addMethod(method, async (params, rawRequest: any) => {
    const req = wrapRequest(params, rawRequest.cookies);
    const res = wrapResponse();

    try {
      // Verify the token before proceeding
      await authenticate(req, res);

      // Return data based on the method
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