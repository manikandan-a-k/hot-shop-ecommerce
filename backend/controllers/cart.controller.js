import User from "../models/user.model.js";

export const addToCart = async (req, res) => {
  try {
    const userId=req.userId
    const {  itemId, size } = req.body;
    const userData = await User.findById(userId);
    const cartData = await userData.cartData;
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    await User.findByIdAndUpdate(userId, { cartData });
    return res.json({
      success: true,
      message: "Added To Cart",
    });
  } catch (error) {
    console.log("Error in addToCart Controller ", error);
    return res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateCart = async (req, res) => {
  try {
    const userId=req.userId
    const {itemId, size, quantity } = req.body;
    const userData = await User.findById(userId);
    const cartData = await userData.cartData;
    cartData[itemId][size] = quantity;
    await User.findByIdAndUpdate(userId, { cartData });
    return res.json({
      success: true,
      
      message: "Cart Updated",
    });
  } catch (error) {
    console.log("Error in updateCart Controller ", error);
    return res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const getUserCart = async (req, res) => {
  try {
    const userId=req.userId
    const userData = await User.findById(userId);
    const cartData = await userData.cartData;
    return res.json({
      success: true,
      cartData,
    });
  } catch (error) {
    console.log("Error in getUserCart Controller ", error);
    return res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
