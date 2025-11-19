import express from 'express';
import meetingController from '../../controllers/meetingController/meeting.controller.js';
const routeMeeting = express.Router()

routeMeeting.post('/', meetingController.createMeeting)
routeMeeting.get('/', meetingController.getAllMeetings)
routeMeeting.get('/filter', meetingController.filterMeetings)
routeMeeting.get('/filter/tutor', meetingController.getMeetingsByTutorName)
routeMeeting.get('/:id', meetingController.getMeetingById)
routeMeeting.put('/:id', meetingController.updateMeeting)
routeMeeting.delete('/:id', meetingController.deleteMeeting)

export default routeMeeting

