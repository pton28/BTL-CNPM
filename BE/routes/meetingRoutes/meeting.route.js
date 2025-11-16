const express = require('express')
const meetingController = require('../../controllers/meetingController/meeting.controller')
const routeMeeting = express.Router()

routeMeeting.post('/', meetingController.createMeeting)
routeMeeting.get('/', meetingController.getAllMeetings)
routeMeeting.get('/:id', meetingController.getMeetingById)
routeMeeting.put('/:id', meetingController.updateMeeting)
routeMeeting.delete('/:id', meetingController.deleteMeeting)

module.exports = routeMeeting

