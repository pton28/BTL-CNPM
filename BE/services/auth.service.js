// import User from '../models/user.model.js';
import Student from '../models/student.model.js';
import Tutor from '../models/tutor.model.js';
import jwt from 'jsonwebtoken'


export const authService = {
  loginStudent : async (email, password) => {
    const user = await Student.findOne({ email, password });
    if (!user) return null;

    const token = jwt.sign({ id: user.userId, email: user.email, role: 'student' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return { user, token };
  },

  loginTutor : async (email, password) => {
    const user = await Tutor.findOne({ email, password });
    if (!user) return null;

    const token = jwt.sign({ id: user.userId, email: user.email, role: 'tutor' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return { user, token };
  }
}