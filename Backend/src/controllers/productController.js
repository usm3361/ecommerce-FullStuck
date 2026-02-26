import { getAllProductsService } from "../services/productService.js";


export async function getAllProductsController(req, res) {
  try {
    const productsArr = await getAllProductsService();
    return res
      .status(201)
      .json({ msg: "This is all products:", data: productsArr });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
}

export function getProductByIdController(req, res) {}
