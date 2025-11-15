const express = require('express')
const studentController = require('../controllers/student.controller')
const routeStudent = express.Router()

routeStudent.get('/login', studentController.loginStudent)


module.exports = routeStudent