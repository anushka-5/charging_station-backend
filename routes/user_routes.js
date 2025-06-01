
import express from "express";
import userController from '../controller/user_controller.js';

const router = express.Router();

// Route to create a new user
router.post("/register",  userController.createUser);

router.post("/login", userController.loginUser);


export default router;