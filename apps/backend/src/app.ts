import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler";
// import rpcServer from "./rpcServer";
import router from "./router";

const app = express();

dotenv.config();
app.use(express.json()); 

const corsOptions = {
  origin: "http://localhost:5173", 
  credentials: true, 
};
app.use(cors(corsOptions));

app.use(bodyParser.json()); 
app.use(cookieParser()); 

// Routes
app.use('/', router()) ;


app.use(errorHandler);


export default app;


















// RPC Endpoint
// app.options("/rpc", cors(corsOptions));
// app.post("/rpc", (req, res) => {
//   const jsonRPCRequest = req.body;

//   // Add cookies to the raw request for authentication
//   const rawRequest = {
//     ...req.body,
//     cookies: req.cookies,
//   };

//   rpcServer.receive(jsonRPCRequest, rawRequest).then((jsonRPCResponse) => {
//     if (jsonRPCResponse) {
//       res.json(jsonRPCResponse);
//     } else {
//       res.sendStatus(204);
//     }
//   });
// });

// Error handling