import { sendResponse } from "../helper/sendResponse.js";
import { loginStudentService, getStudentByIdService } from "../services/student.service.js";

const studentController = {
  loginStudent: async (req, res) => {
    const student = await loginStudentService(
      req.body.email,
      req.body.password
    );
    if (student)
      return sendResponse(res, {
        status: 200,
        message: "Login success",
        data: student,
        EC: 0,
      });
    else
      return sendResponse(res, {
        status: 401,
        message: "Login failed",
        EC: -1,
        data: null,
      });
  },
  getStudentById: async (req, res) => {
    const { id } = req.params;
    const student = await getStudentByIdService(id);
    if (student)
      return sendResponse(res, {
        status: 200,
        message: "Get student by id success",
        data: student,
        EC: 0,
      });
    else
      return sendResponse(res, {
        status: 404,
        message: "Student not found",
        EC: -1,
        data: null,
      });
  },
};

export default studentController;
