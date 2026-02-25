import { getMongoConnection } from "../config/dbConn.js";


const db = await getMongoConnection()

const usersCollection = db.collection("users")

const productsCollection = db.collection("products")

const userProductsCollection = db.collection("userProducts")

const ordersCollection = db.collection("orders")