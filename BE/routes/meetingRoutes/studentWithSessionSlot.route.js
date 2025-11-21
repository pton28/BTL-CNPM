import express from 'express';
import studentWithSessionSlotController from '../../controllers/meetingController/studentWithSessionSlot.controller.js';
const routeStudentWithSessionSlot = express.Router()

routeStudentWithSessionSlot.post('/', studentWithSessionSlotController.createStudentWithSessionSlot)
routeStudentWithSessionSlot.get('/', studentWithSessionSlotController.getAllStudentWithSessionSlots)
routeStudentWithSessionSlot.get('/student/:studentId/meeting/:meetingId', studentWithSessionSlotController.getStudentWithSessionSlotByStudentAndMeeting)
routeStudentWithSessionSlot.get('/:id', studentWithSessionSlotController.getStudentWithSessionSlotById)
routeStudentWithSessionSlot.put('/:id', studentWithSessionSlotController.updateStudentWithSessionSlot)
routeStudentWithSessionSlot.delete('/:id', studentWithSessionSlotController.deleteStudentWithSessionSlot)

export default routeStudentWithSessionSlot

