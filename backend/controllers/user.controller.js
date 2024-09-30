import bcrypt from "bcrypt";
import validator from "validator";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/env.vars.js";

// Genetate JWT Token Function
const createToken = (id) => {
  return jwt.sign({ id }, ENV_VARS.JWT_SECRETKEY);
};

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //Check Existing User
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }
 
    //Hashing the password using bcrypt

    const genSalt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, genSalt);

    //Creating New User
    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });
    //Store the user in database
    const user = await newUser.save();

    //Genetate token
    const token = createToken(user._id);

    return res.json({
      success: true,
      token,
      message: "Account created successfully",
    });
  } catch (error) {
    console.log("Error in Signup Controller " + error.message);
    return res.json({
      success: false,
      message: "Internal Server error" || error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //User Exists
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.json({
        success: false,
        message: "User not Found",
      });
    }
    // Check password
    const isMatch = await bcrypt.compare(password, userExists.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Please check your password",
      });
    } else if (isMatch) {
      const token = createToken(userExists._id);
      return res.json({
        success: true,
        token,
        message: "Login Success",
      });
    }
  } catch (error) {
    console.log("Error in Login Controller " + error.message);
    return res.json({
      success: false,
      message: "Internal Server error" || error.message,
    });
  }
};

//Admin Login

export const adminLogin = async (req, res) => {
  try {
    const {email,password}=req.body
    if(email===ENV_VARS.ADMIN_EMAIL&&password===ENV_VARS.ADMIN_PASSWORD)
    {
      const token = jwt.sign({ email }, ENV_VARS.JWT_SECRETKEY);
      return res.json({
        success:true,
        token
      })
    }
    else{
      return res.json({
        success:false,
        message:"Not Authorized"
      })
    }
  } catch (error) {
    console.log("Error in admin login controller ",error)
    return res.json({
     success:false,
     message:"Internal server error "||error.message

    })
  }
};
