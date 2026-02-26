import { getMongoConnection } from "../config/dbConn.js";
import { ObjectId } from 'mongodb'

const db = await getMongoConnection();
const productCollection = db.collection("product");

export async function getAllProducts() { 
    const productsArr = await productCollection.find().toArrey()
    return productsArr
}

export async function getProductById(id) {
const product = await productCollection.findOne({_id:new ObjectId(id)});
return product;
}

