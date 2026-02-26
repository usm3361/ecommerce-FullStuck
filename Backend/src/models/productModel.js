import { getMongoConnection } from "../config/dbConn.js";
import { ObjectId } from "mongodb";

const db = await getMongoConnection();
const productCollection = db.collection("products");

export async function getAllProductsModel() {
  return await productCollection.find().toArray();
}

export async function getProductByIdModel(id) {
  return await productCollection.findOne({ _id: new ObjectId(id) });
}
