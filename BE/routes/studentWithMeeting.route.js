const express = require('express')
const StudentWithMeetingController = require('../controllers/studentWithMeeting.controller')
const routeStudentWithMeeting = express.Router()

routeStudentWithMeeting.get('/', StudentWithMeetingController.getAllMeetingByStudent)


module.exports = routeStudentWithMeeting