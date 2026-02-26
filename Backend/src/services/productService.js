import { getAllProductsModel, getProductByIdModel } from "../models/productModel.js";

export async function getAllProductsService() {
    const productsArr = await getAllProductsModel()
    return productsArr
}

export async function getProductByIdService(id) { 
    const product = await getProductByIdModel(id)
    return product
}


