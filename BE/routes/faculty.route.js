import express from 'express';
import facultyController from '../controllers/faculty.controller.js';
const routeFaculty = express.Router()

routeFaculty.post('/', facultyController.createFaculty)
routeFaculty.get('/', facultyController.getAllFaculties)
routeFaculty.get('/:id', facultyController.getFacultyById)
routeFaculty.put('/:id', facultyController.updateFaculty)
routeFaculty.delete('/:id', facultyController.deleteFaculty)

export default routeFaculty

