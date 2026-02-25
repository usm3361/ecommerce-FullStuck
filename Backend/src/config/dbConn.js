import { MongoClient } from "mongodb";

let client;

export async function connectToMongoDB() {
  if (client) return;
  try {
    client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    console.log("Connecting to mongo");
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function getMongoConnection() {
  if (!client) await connectToMongoDB();
  return client.db();
}
