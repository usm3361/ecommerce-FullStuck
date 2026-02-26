import * as userProductModel from "../models/userProductModel.js";

import * as productModel from "../models/productModel.js";
import { ObjectId } from "mongodb";

export async function getCartService(userId) {
  const cartItems = await userProductModel.getCartItems(userId);

  const populatedCart = await Promise.all(
    cartItems.map(async (item) => {
      const productDetails = await productModel.getProductById(item.productId);
      return {
        ...item,
        product: productDetails,
      };
    }),
  );

  return populatedCart;
}
