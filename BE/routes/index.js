const routeStudent = require("./student.route");
const routeTutor = require("./tutor.route");

function initRoutes(app) {
  app.use("/student", routeStudent)
  app.use("/tutor", routeTutor)
}

module.exports = initRoutes;
