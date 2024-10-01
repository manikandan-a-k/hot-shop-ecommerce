import express from "express";
import { ENV_VARS } from "./config/env.vars.js";
import cors from "cors";
import { connectDb } from "./config/db.connect.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";
//App Config
const app = express();
app.use(express.json());
const allowedOrigins = ["https://hot-shop-ecommerce.vercel.app","https://hot-shop-admin.vercel.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

//api end points
app.get("/", (req, res) => {
  res.send("API Is Working");
});

app.use("/api/auth", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
const PORT = 3000 || ENV_VARS.PORT;
app.listen(PORT, () => {
  connectDb();
  connectCloudinary();
  console.log(`Server is running at ${PORT}`);
});
