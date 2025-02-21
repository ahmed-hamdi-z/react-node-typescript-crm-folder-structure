import express from "express";
import cors from "cors";
import session from 'express-session';
import { errorHandler } from "./middleware/errorHandler";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes";
import protectedRoutes from "./routes/protectedRoutes";


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

/// Routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);

app.get('/', (req, res) => {
  res.send('Auth API');
});

// Error handling
app.use(errorHandler);

export default app;