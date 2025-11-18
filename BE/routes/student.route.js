import express from "express";
import studentController from "../controllers/student.controller.js";
const router = express.Router();

router.post("/login", studentController.loginStudent);

export default router;
