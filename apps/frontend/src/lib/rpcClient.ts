import axios from "axios";

interface JSONRPCRequest {
  jsonrpc: string;
  method: string;
  params: any;
  id?: number | string;
}

interface JSONRPCResponse {
  jsonrpc: string;
  result?: any;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
  id?: number | string;
}

export const rpcClient = async (method: string, params?: any): Promise<any> => {
  const request: JSONRPCRequest = {
    jsonrpc: "2.0",
    method,
    params,
    id: Math.floor(Math.random() * 1000), // Unique ID for the request
  };

  const baseUrl = 'http://localhost:5000/rpc';
  try {
    const response = await axios.post(baseUrl, request, {
      withCredentials: true, // Include cookies for authentication
    });

    const rpcResponse: JSONRPCResponse = response.data;

    if (rpcResponse.error) {
      throw new Error(rpcResponse.error.message);
    }

    return rpcResponse.result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error?.message || "RPC request failed");
    }
    throw new Error("RPC request failed");
  }
};