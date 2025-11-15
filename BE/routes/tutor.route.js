const express = require('express')
const tutorController = require('../controllers/tutor.controller')
const routeTutor = express.Router()

routeTutor.post('/login', tutorController.loginTutor)
routeTutor.get('/', tutorController.getAllTutor)

module.exports = routeTutor