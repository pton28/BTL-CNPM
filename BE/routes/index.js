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
import { authMiddleware } from "../middleware/auth.middleware.js";

function initRoutes(app) {
  app.use("/student",authMiddleware, routeStudent)
  app.use("/tutor", authMiddleware, routeTutor)
  app.use("/meeting", authMiddleware, routeMeeting)
  app.use("/faculty", routeFaculty)
  app.use("/major", routeMajor)
  app.use("/student-with-meeting", authMiddleware, routeStudentWithMeeting)
  app.use("/session", authMiddleware, routeSession)
  app.use("/session-slot", authMiddleware, routeSessionSlot)
  app.use("/student-with-session-slot", authMiddleware, routeStudentWithSessionSlot)
  app.use("/material", authMiddleware, routeMaterial)
  app.use("/auth", routeAuth)
}

export default initRoutes
