import { ENV_VARS } from "../config/env.vars.js";
import orderModel from "../models/order.model.js";
import User from "../models/user.model.js";
import Stripe from "stripe";
//Global Variables
const currency = "inr";
const deliveryCharge = 50;
//Gateway initialize
const stripe = new Stripe(ENV_VARS.STRIPE_SECRET_KEY);
//Place order using COT Method
const placeOrderCod = async (req, res) => {
  try {
    const userId = req.userId;

    const { items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      amount: Number(amount),
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await User.findByIdAndUpdate(userId, { cartData: {} });
    return res.json({
      success: true,
      message: "Order Placed",
    });
  } catch (error) {
    console.log("Error in COT Controller ", error.message);
    return res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//Place order using Stripe Method
const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, amount, address } = req.body;
    const { origin } = req.headers;
    const orderData = {
      userId,
      items,
      amount: Number(amount),
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });
    //Session in Stripe
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });
    return res.json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.log("Error in Stripe Controller ", error);
    return res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
//Verify Stripe
const verifyStripe = async (req, res) => {
  try {
    const userId = req.userId;
    const { orderId, success } = req.body;
    if (success) {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await User.findByIdAndUpdate(userId, { cartData: {} });
      return res.json({
        success: true,
        message: "Payment Success",
      });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      return res.json({
        success: false,
        message: "Payment Failed",
      });
    }
  } catch (error) {
    console.log("Error in verify stripe controller ", error.message);
    return res.json({
      success: false,
      message: "Internal Server Error" || error.message,
    });
  }
};
//Place order using RazorPay Method
const placeOrderRazorPay = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error in RazorPay Controller ", error);
    return res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//All Orders For AdminPanel
const allOrders = async (req, res) => {
  try {
    const ordersData = await orderModel.find({});
    return res.json({
      success: true,
      ordersData,
    });
  } catch (error) {
    console.log("Error in Admin Order Controller ", error);
    return res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// User Order
const userOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await orderModel.find({ userId });
    return res.json({
      success: true,
      ordersData: orders,
    });
  } catch (error) {
    console.log("Error in User order Controller ", error);
    return res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// update order status from admin Panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    return res.json({
      success: true,
      message: "Status Updated",
    });
  } catch (error) {
    console.log("Error in User order Controller ", error);
    return res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export {
  placeOrderCod,
  placeOrderStripe,
  placeOrderRazorPay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe
};
