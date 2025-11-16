const express = require('express')
const sessionController = require('../../controllers/meetingController/session.controller')
const routeSession = express.Router()

routeSession.post('/', sessionController.createSession)
routeSession.get('/', sessionController.getAllSessions)
routeSession.get('/:id', sessionController.getSessionById)
routeSession.put('/:id', sessionController.updateSession)
routeSession.delete('/:id', sessionController.deleteSession)

module.exports = routeSession

