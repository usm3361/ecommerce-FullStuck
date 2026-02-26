import { getMongoConnection } from "../config/dbConn.js";
import { ObjectId } from 'mongodb'

const db = await getMongoConnection()
const productCollection = db.collection("products");

export async function getAllProductsModel() { 
    const productsArr = await productCollection.find().toArray()
    return productsArr
}

export async function getProductByIdModel(id) {
const product = await productCollection.findOne({_id:new ObjectId(id)});
return product;
}

