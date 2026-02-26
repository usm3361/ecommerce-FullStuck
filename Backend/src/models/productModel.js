import { ObjectId } from "mongodb";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../utils/products.json");

const db = await fs.readFile(filePath, "utf-8");
const products = JSON.parse(db);


export async function getAllProductsModel() {
  return products;
}

export async function getProductByIdModel(id) {
  const product = products.find(
    (p) => p._id === id || p._id === new ObjectId(id).toString(),
  );
  return product;
}
