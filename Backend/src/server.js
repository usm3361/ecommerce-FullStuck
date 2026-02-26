import "dotenv/config";
import app from "./app.js";

import { connectToMongoDB } from "./config/dbConn.js";

const port = process.env.PORT_SERVER || 3000;

await connectToMongoDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
