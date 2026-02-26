import { getMongoConnection } from "../config/dbConn.js";
import { ObjectId } from "mongodb";

const db = await getMongoConnection();
const userProductCollection = db.collection("userProducts");

export async function getCartItems(userId) {
  return await userProductCollection
    .find({ userId: new ObjectId(userId) })
    .toArray();
}

export async function findCartItem(userId, productId) {
  return await userProductCollection.findOne({
    userId: new ObjectId(userId),
    productId: new ObjectId(productId),
  });
}

export async function addCartItem(item) {
  return await userProductCollection.insertOne(item);
}

export async function updateCartItemQuantity(id, quantity) {
  return await userProductCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { quantity } },
  );
}
export async function removeCartItem(id) {
  return await userProductCollection.deleteOne({ _id: new ObjectId(id) });
}
export async function clearCart(userId) {
  return await userProductCollection.deleteMany({
    userId: new ObjectId(userId),
  });
}