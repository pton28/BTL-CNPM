import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login/student", authController.loginStudent);
router.post('/login/tutor', authController.loginTutor);

export default router;