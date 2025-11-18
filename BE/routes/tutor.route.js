import express from 'express';
import tutorController from '../controllers/tutor.controller.js';
const routeTutor = express.Router()

routeTutor.post('/login', tutorController.loginTutor)
routeTutor.get('/', tutorController.getAllTutor)

export default routeTutor
