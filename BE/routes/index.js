import routeStudent from "./student.route.js";
import routeTutor from "./tutor.route.js";
import routeMeeting from "./meetingRoutes/meeting.route.js";
import routeFaculty from "./faculty.route.js";
import routeMajor from "./major.route.js";
import routeStudentWithMeeting from './studentWithMeeting.route.js';
import routeSession from './meetingRoutes/session.route.js';
import routeSessionSlot from './meetingRoutes/sessionSlot.route.js';
import routeStudentWithSessionSlot from './meetingRoutes/studentWithSessionSlot.route.js';
import routeMaterial from './material.route.js';
import routeAuth from './auth.route.js';

function initRoutes(app) {
  app.use("/student", routeStudent)
  app.use("/tutor", routeTutor)
  app.use("/meeting", routeMeeting)
  app.use("/faculty", routeFaculty)
  app.use("/major", routeMajor)
  app.use("/student-with-meeting", routeStudentWithMeeting)
  app.use("/session", routeSession)
  app.use("/session-slot", routeSessionSlot)
  app.use("/student-with-session-slot", routeStudentWithSessionSlot)
  app.use("/material", routeMaterial)
  app.use("/auth", routeAuth)
}

export default initRoutes
