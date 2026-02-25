import { getMongoConnection } from "../config/dbConn.js";
import { ObjectId } from 'mongodb'

const db = await getMongoConnection();
const usersCollection = db.collection("users");

export async function createUser(userData) { 
    const result = await usersCollection.insertOne(userData)
    return result.insertedId
}

export async function findUserByEmail(email) {
  const user = await usersCollection.findOne({ email: email });
  return user;
}

export async function findUserById(id) {
const user = await usersCollection.findOne({_id:new ObjectId(id)});
return user;
}

