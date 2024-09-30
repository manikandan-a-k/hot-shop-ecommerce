import {v2 as cloudinary} from "cloudinary"
import { ENV_VARS } from "./env.vars.js"

 const connectCloudinary=async()=>{
 try {
     cloudinary.config({
        cloud_name:ENV_VARS.CLOUDINARY_NAME,
        api_key:ENV_VARS.CLOUDINARY_API_KEY,
        api_secret:ENV_VARS.CLOUDINARY_SECRET_KEY
     })
 } catch (error) {
    console.log("Error to connect Cloudinary")
 }
}
export default connectCloudinary