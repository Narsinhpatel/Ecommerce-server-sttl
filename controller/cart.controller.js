import { Cart } from "../models/cart.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createOrUpdateCart = async (req, res, next) => {
  const { userId, items } = req.body;

  console.log(userId, items);

  // Validate the input
  if (!userId || !items || !Array.isArray(items) || items.length === 0) {
    throw new ApiError(404, "User ID and items are required");
  }

  // Ensure each item has product and price
  for (const item of items) {
    if (!item.product || !item.price) {
      throw new ApiError(404, "Each item must have a product and price");
    }
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({ user: userId, items });
  } else {
    // Check if product already exists in the cart
    items.forEach(item => {
      const existingItemIndex = cart.items.findIndex(cartItem => cartItem.product.toString() === item.product);
      if (existingItemIndex >= 0) {
        // Update quantity or price if needed
        cart.items[existingItemIndex].price += item.price;
      } else {
        cart.items.push(item);
      }
    });
  }

  await cart.save();

  if (!cart) {
    throw new ApiError(500, "Internal server error updating cart");
  }

  return res.status(200).json(
    new ApiResponse(200, cart, "Item Added")
  );
};

export const getCartById = async (req, res, next) => {
  try {
    const cartId = req.params.id; 
    
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json(new ApiResponse(404, null, "Cart not found"));
    }

    return res.status(200).json(new ApiResponse(200, cart, "Cart details"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiResponse(500, null, "Error retrieving cart"));
  }
};
