import express from "express";
import {
  allOrders,
  placeOrderCod,
  placeOrderRazorPay,
  placeOrderStripe,
  updateStatus,
  userOrders,
  verifyStripe,
} from "../controllers/order.controller.js";
import { adminAuth } from "../middleware/admin.auth.js";
import authUser from "../middleware/user.auth.js";

const orderRouter = express.Router();
//Admin
orderRouter.get("/allorders", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

//Payment
orderRouter.post("/cod", authUser, placeOrderCod);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/razorpay", authUser, placeOrderRazorPay);
//verify Payment
orderRouter.post("/verifyStripe", authUser, verifyStripe);
//User
orderRouter.get("/userorders", authUser, userOrders);

export default orderRouter;
