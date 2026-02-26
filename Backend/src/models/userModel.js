import { getMongoConnection } from "../config/dbConn.js";
import { ObjectId } from "mongodb";

const db = await getMongoConnection();
const usersCollection = db.collection("users");

export async function createUserModel(userData) {
  const result = await usersCollection.insertOne(userData);
  return result.insertedId;
}

export async function findUserByEmailModel(email) {
  return await usersCollection.findOne({ email });
}

export async function findUserByIdModel(id) {
  return await usersCollection.findOne({ _id: new ObjectId(id) });
}
