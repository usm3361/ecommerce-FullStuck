import express from "express";
import { createRegister, login } from "../controllers/authController.js";

const router = express.Router()

router.post('/register',createRegister)

router.post('/login',login)



export default router