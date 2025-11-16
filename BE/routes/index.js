const routeStudent = require("./student.route");
const routeTutor = require("./tutor.route");
const routeMeeting = require("./meetingRoutes/meeting.route");
const routeFaculty = require("./faculty.route");
const routeMajor = require("./major.route");
const routeStudentWithMeeting = require('./studentWithMeeting.route')
const routeSession = require('./meetingRoutes/session.route')
const routeSessionSlot = require('./meetingRoutes/sessionSlot.route')
const routeStudentWithSessionSlot = require('./meetingRoutes/studentWithSessionSlot.route')


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
}

module.exports = initRoutes
