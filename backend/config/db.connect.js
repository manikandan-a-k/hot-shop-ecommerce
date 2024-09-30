import mongoose from "mongoose";
import { ENV_VARS } from "./env.vars.js";

export const connectDb=async()=>{
    try {
          const conn=await mongoose.connect(ENV_VARS.MONGODB_URL)
          console.log(`MongoDb Connected at ${conn.connection.host}`)
    } catch (error) {
         console.log(`Error to connect MongoDb ${error.message}`)
    }

}