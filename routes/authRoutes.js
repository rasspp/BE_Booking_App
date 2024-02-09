import express from "express";
import { getAllUsers, registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
