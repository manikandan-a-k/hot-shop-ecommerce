import express from "express";
import {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
} from "../controllers/product.controller.js";
import upload from "../middleware/multer.js";
import { adminAuth } from "../middleware/admin.auth.js";

const router = express.Router();

// Route to add a product, allowing multiple images
router.post("/add", adminAuth, upload.array("images", 4), addProduct);

// Route to remove a product
router.delete("/remove/:id", adminAuth, removeProduct);

// Route to get a single product by ID
router.get("/single/:id", singleProduct);

// Route to list all products
router.get("/list", listProducts);

export default router;
