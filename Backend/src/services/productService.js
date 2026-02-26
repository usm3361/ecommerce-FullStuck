import {
  getAllProductsModel,
  getProductByIdModel,
} from "../models/productModel.js";

export async function getAllProductsService() {
  return await getAllProductsModel();
}

export async function getProductByIdService(id) {
  return await getProductByIdModel(id);
}
