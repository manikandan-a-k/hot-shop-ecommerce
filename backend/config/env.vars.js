import dotenv from "dotenv";
dotenv.config();

export const ENV_VARS = {
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRETKEY: process.env.JWT_SECRETKEY,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET_KEY: process.env.CLOUDINARY_SECRET_KEY,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
};
