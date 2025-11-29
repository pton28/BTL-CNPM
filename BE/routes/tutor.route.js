import express from 'express';
import tutorController from '../controllers/tutor.controller.js';
const routeTutor = express.Router()

routeTutor.post('/login', tutorController.loginTutor)
routeTutor.get('/', tutorController.getAllTutor)
routeTutor.get('/:id', tutorController.getTutorById)

export default routeTutor