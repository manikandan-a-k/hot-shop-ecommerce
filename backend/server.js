import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.connect.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";
import { ENV_VARS } from "./config/env.vars.js";

// App Config
const app = express();
app.use(express.json());



// CORS configuration
app.use(
  cors()
);

// API Endpoints
app.get("/", (req, res) => {
  res.send("API Is Working");
});

app.use("/api/auth", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Server Setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDb();
  connectCloudinary();
  console.log(`Server is running at port ${PORT}`);
});
