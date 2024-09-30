import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/env.vars.js";

export const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized",
      });
    }
    const decode = jwt.verify(token, ENV_VARS.JWT_SECRETKEY);
    if (decode.email !== ENV_VARS.ADMIN_EMAIL) {
      return res.json({
        success: false,
        message: "Not Authorized",
      });
    }
    next();
  } catch (error) {
    console.log("Error in Admin auth Middleware " + error);
    return res.json({
      success: false,
      message: "Internal Server Error " || error.message
    });
  }
};
