import { sendResponse } from "../helper/sendResponse";
import { loginStudentService } from "../services/student.service";

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
};

export default studentController;
