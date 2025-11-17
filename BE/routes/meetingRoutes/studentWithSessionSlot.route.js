const express = require('express')
const studentWithSessionSlotController = require('../../controllers/meetingController/studentWithSessionSlot.controller')
const routeStudentWithSessionSlot = express.Router()

routeStudentWithSessionSlot.post('/', studentWithSessionSlotController.createStudentWithSessionSlot)
routeStudentWithSessionSlot.get('/', studentWithSessionSlotController.getAllStudentWithSessionSlots)
routeStudentWithSessionSlot.get('/:id', studentWithSessionSlotController.getStudentWithSessionSlotById)
routeStudentWithSessionSlot.put('/:id', studentWithSessionSlotController.updateStudentWithSessionSlot)
routeStudentWithSessionSlot.delete('/:id', studentWithSessionSlotController.deleteStudentWithSessionSlot)

module.exports = routeStudentWithSessionSlot

