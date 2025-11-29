import express from "express";
import studentController from "../controllers/student.controller.js";
const router = express.Router();

router.post("/login", studentController.loginStudent);
router.get("/:id", studentController.getStudentById);

export default router;