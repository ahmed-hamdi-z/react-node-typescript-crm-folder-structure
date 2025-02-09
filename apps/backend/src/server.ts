import app from "./app";
import { connectToDatabase } from "./config/db";

const PORT = process.env.PORT || 6000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
  });