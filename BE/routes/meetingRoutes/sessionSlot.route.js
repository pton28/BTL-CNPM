const express = require('express')
const sessionSlotController = require('../../controllers/meetingController/sessionSlot.controller')
const routeSessionSlot = express.Router()

routeSessionSlot.post('/', sessionSlotController.createSessionSlot)
routeSessionSlot.get('/', sessionSlotController.getAllSessionSlots)
routeSessionSlot.get('/:id', sessionSlotController.getSessionSlotById)
routeSessionSlot.put('/:id', sessionSlotController.updateSessionSlot)
routeSessionSlot.delete('/:id', sessionSlotController.deleteSessionSlot)

module.exports = routeSessionSlot

