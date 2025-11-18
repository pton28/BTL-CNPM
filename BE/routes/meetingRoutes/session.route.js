import express from 'express';
import sessionController from '../../controllers/meetingController/session.controller.js';
const routeSession = express.Router()

routeSession.post('/', sessionController.createSession)
routeSession.get('/', sessionController.getAllSessions)
routeSession.get('/:id', sessionController.getSessionById)
routeSession.put('/:id', sessionController.updateSession)
routeSession.delete('/:id', sessionController.deleteSession)

export default routeSession

