const express = require('express')
const facultyController = require('../controllers/faculty.controller')
const routeFaculty = express.Router()

routeFaculty.post('/', facultyController.createFaculty)
routeFaculty.get('/', facultyController.getAllFaculties)
routeFaculty.get('/:id', facultyController.getFacultyById)
routeFaculty.put('/:id', facultyController.updateFaculty)
routeFaculty.delete('/:id', facultyController.deleteFaculty)

module.exports = routeFaculty

