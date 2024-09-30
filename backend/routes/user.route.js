import express from "express"
import { adminLogin, login, signUp } from "../controllers/user.controller.js"

const router=express.Router()

//Route for user register
router.post("/signup",signUp)
//Route for user login
router.post("/login",login)
//Route for admin login
router.post("/admin",adminLogin)


export default router