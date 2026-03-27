import { Router } from "express";
import { login, logout, registerAdmin, verifyOtp, refresh } from "../controllers/user.controller.js";

const router = Router();

router.post('/register',registerAdmin);
router.post('/login',login);
router.post('/logout',logout);
router.post('/verify',verifyOtp);
router.get('/refresh',refresh);

export default router;