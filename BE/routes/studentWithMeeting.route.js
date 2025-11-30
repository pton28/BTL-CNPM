import express from 'express';
import StudentWithMeetingController from '../controllers/studentWithMeeting.controller.js';
const routeStudentWithMeeting = express.Router()

routeStudentWithMeeting.get('/:id', StudentWithMeetingController.getAllMeetingByStudent)
routeStudentWithMeeting.post('/', StudentWithMeetingController.createStudentMeeting)
routeStudentWithMeeting.delete('/', StudentWithMeetingController.deleteStudentMeeting)


export default routeStudentWithMeeting