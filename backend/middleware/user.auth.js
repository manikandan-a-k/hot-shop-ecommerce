import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/env.vars.js";

const authUser = async (req, res, next) => {
  const { token } = req.headers;
  try {
    if (!token) {
      return res.json({
        success: false,
        message: "You're not logged in. Please log in to continue.",
      });
    }
    const token_decode = jwt.verify(token, ENV_VARS.JWT_SECRETKEY);
    if (!token_decode) {
      return res.json({
        success: false,
        message: "Your session has expired. Please log in again.",
      });
    }
    req.userId = token_decode.id;
    next();
  } catch (error) {
    console.log("Error in user auth Middleware ", error);
    return res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default authUser;
