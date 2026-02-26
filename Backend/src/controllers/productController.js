import { createProductService, getAllProductsService } from "../services/productService";

export async function createProductController(req, res) {
  try {
    const { name, price, category, stock } = req.body;
    if (!name || !price || !category || !stock) {
      return res.status(400).json({
        msg: "Please provide name, price, category, stock",
      });
    }
    const newProduct = createProductService(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
}

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
