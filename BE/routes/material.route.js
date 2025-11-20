import express from 'express';
import MaterialController from '../controllers/material.controller.js';
const routeMaterial = express.Router()

routeMaterial.post('/', MaterialController.createMaterial)
routeMaterial.get('/', MaterialController.getAllMaterials)
routeMaterial.get('/meeting/:meetingId', MaterialController.getMaterialsByMeeting)
routeMaterial.put('/:id', MaterialController.updateMaterial)
routeMaterial.delete('/:id', MaterialController.deleteMaterial)

export default routeMaterial

