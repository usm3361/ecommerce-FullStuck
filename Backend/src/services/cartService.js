import * as userProductModel from "../models/userProductModel.js";
import * as productModel from "../models/productModel.js";
import { ObjectId } from "mongodb";

export async function getCart(userId) {
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

export async function addToCart(userId, productId, quantity) {
  const product = await productModel.getProductById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  if (quantity > product.stock) {
    throw new Error("Not enough items in stock");
  }

  const existingItem = userProductModel.findCartItem(userId, productId);

  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity;
    if (newQuantity > product.stock) {
      throw new Error("Cannot add more of this item, stock limit reached");
    }
    await userProductModel.updateCartItemQuantity(
      existingItem._id,
      newQuantity,
    );
    return { ...existingItem, quantity: newQuantity };
  } else {
    const newItem = {
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
      quantity: quantity,
    };
    const result = await userProductModel.addCartItem(newItem);

    return { _id: result.insertedId, ...newItem };
  }
}

export async function updateQuantity(cartItemId, quantity) {
  await userProductModel.updateCartItemQuantity(cartItemId, quantity);
  return { message: "Item quantity updated successfully" };
}

export async function removeFromCart(cartItemId) {
  await userProductModel.removeCartItem(cartItemId);
  return { message: "Item removed from cart successfully" };
}
