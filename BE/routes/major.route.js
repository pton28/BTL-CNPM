const express = require('express')
const majorController = require('../controllers/major.controller')
const routeMajor = express.Router()

routeMajor.post('/', majorController.createMajor)
routeMajor.get('/', majorController.getAllMajors)
routeMajor.get('/:id', majorController.getMajorById)
routeMajor.put('/:id', majorController.updateMajor)
routeMajor.delete('/:id', majorController.deleteMajor)

module.exports = routeMajor

