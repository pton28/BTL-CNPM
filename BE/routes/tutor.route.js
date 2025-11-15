const express = require('express')
const tutorController = require('../controllers/tutor.controller')
const routeTutor = express.Router()

routeTutor.get('/login', tutorController.loginTutor)


module.exports = routeTutor