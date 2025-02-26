import express from "express";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler";
// import authRoutes from "./router/authRoutes";
// import protectedRoutes from "./router/protectedRoutes";
// import rpcServer from "./rpcServer";
import router from "./router";

// Load environment variables
dotenv.config();

const app = express();
// const jwtSecret = process.env.JWT_SECRET!;

// Middleware
const corsOptions = {
  origin: "http://localhost:5173", // Allow only this origin
  credentials: true, // Allow credentials (cookies, authorization headers)
};

app.use(cors(corsOptions));

app.use(bodyParser.json()); // Parse JSON request bodies
app.use(express.json()); // Parse JSON request bodies (alternative)
app.use(cookieParser()); // Parse cookies

// Routes
app.use('/', router()) ;

// Session management
// app.use(
//   session({
//     secret: jwtSecret,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }, // 1 day
//   })
// );


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
app.use(errorHandler);


export default app;