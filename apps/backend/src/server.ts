import app from "./app";
import connectToDatabase  from "./config/db";
import { NODE_ENV, PORT } from "./constants/env";

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
  });