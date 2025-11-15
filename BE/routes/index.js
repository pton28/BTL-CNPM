const routeStudent = require("./student.route");
const routeTutor = require("./tutor.route");
const routeMeeting = require("./meeting.route");
const routeFaculty = require("./faculty.route");
const routeMajor = require("./major.route");

function initRoutes(app) {
  app.use("/student", routeStudent)
  app.use("/tutor", routeTutor)
  app.use("/meeting", routeMeeting)
  app.use("/faculty", routeFaculty)
  app.use("/major", routeMajor)
}

module.exports = initRoutes;
