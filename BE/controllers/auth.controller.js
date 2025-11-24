import { authService }  from "../services/auth.service.js";

export const authController = {
  loginStudent: async (req, res) => {
    const { email, password } = req.body;
    const result = await authService.loginStudent(email, password);
    return res.status(200).json(result);
  },

  loginTutor: async (req, res) => {
    const { email, password } = req.body;
    const result = await authService.loginTutor(email, password);
    return res.status(200).json(result);
  },
}