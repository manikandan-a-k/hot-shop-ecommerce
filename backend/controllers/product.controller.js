import { v2 as cloudinary } from "cloudinary";
import Product from "../models/product.model.js";

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      bestseller,
      sizes,
    } = req.body;

    //images path
    const images = req.files.map((file) => file.path);
    
    //upload images in cloudinary
    const imageUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item, {
          resource_type: "image",
          folder: "HotShop",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      images: imageUrl,
      date: Date.now(),
    };
    const product = new Product(productData);
    await product.save();
    res.json({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    console.error("Error in addProduct controller:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error" || error.message,
    });
  }
};

export const listProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.json({
      success: true,
      productsData: products,
    });
  } catch (error) {
    console.log("Error in listProducts controller");
    res.json({
      success: false,
      message: "Internal server error" || error.message,
    });
  }
};
export const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    await Product.findByIdAndDelete(id);
    return res.json({
      success: true,
      message: "Product removed",
    });
  } catch (error) {
    console.log("Error in removeProduct controller");
    res.json({
      success: false,
      message: "Internal server error" || error.message,
    });
  }
};
export const singleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    return res.json({
      success: true,
      productData: product,
    });
  } catch (error) {
    console.log("Error in singleProduct controller");
    res.json({
      success: false,
      message: "Internal server error" || error.message,
    });
  }
};
