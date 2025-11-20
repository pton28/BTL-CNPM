import express from 'express';
import sessionSlotController from '../../controllers/meetingController/sessionSlot.controller.js';
const routeSessionSlot = express.Router()

routeSessionSlot.post('/', sessionSlotController.createSessionSlot)
routeSessionSlot.get('/', sessionSlotController.getAllSessionSlots)
routeSessionSlot.get('/session/:sessionId', sessionSlotController.getSessionSlotsBySessionId)
routeSessionSlot.get('/:id', sessionSlotController.getSessionSlotById)
routeSessionSlot.put('/:id', sessionSlotController.updateSessionSlot)
routeSessionSlot.delete('/:id', sessionSlotController.deleteSessionSlot)

export default routeSessionSlot

