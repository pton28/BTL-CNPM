import express from 'express';
import majorController from '../controllers/major.controller.js';
const routeMajor = express.Router()

routeMajor.post('/', majorController.createMajor)
routeMajor.get('/', majorController.getAllMajors)
routeMajor.get('/:id', majorController.getMajorById)
routeMajor.put('/:id', majorController.updateMajor)
routeMajor.delete('/:id', majorController.deleteMajor)

export default routeMajor