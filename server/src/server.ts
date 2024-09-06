import "dotenv/config";

// Import the app from the app.js file.
import app from "./app";
import connectToDB from "./config/db";
import { PORT } from "./constants/env";

// Start the server on the specified port.
app.listen(PORT, async () => {
  console.log(`Server is running on port: ${PORT}`);
  await connectToDB();
});
