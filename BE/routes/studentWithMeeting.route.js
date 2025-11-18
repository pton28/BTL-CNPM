import express from 'express';
import StudentWithMeetingController from '../controllers/studentWithMeeting.controller.js';
const routeStudentWithMeeting = express.Router()

routeStudentWithMeeting.get('/', StudentWithMeetingController.getAllMeetingByStudent)


export default routeStudentWithMeeting
