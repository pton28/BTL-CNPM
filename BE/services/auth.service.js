// import User from '../models/user.model.js';
import Student from '../models/student.model.js';
import Tutor from '../models/tutor.model.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';

export const authService = {
  loginStudent: async (email, password) => {

    // Tìm người dùng theo email
    const user = await Student.findOne({ email });
    // console.log('user', user)
    if (!user) return null; // Nếu không tìm thấy người dùng, trả về null

    // So sánh mật khẩu người dùng nhập vào với mật khẩu đã mã hóa trong cơ sở dữ liệu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null; // Nếu không khớp mật khẩu, trả về null

    // Tạo token JWT nếu mật khẩu khớp
    const token = jwt.sign(
      { id: user.userId, email: user.email, role: 'student' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return { user, token };
  },

  loginTutor: async (email, password) => {
    // Tìm người dùng theo email
    const user = await Tutor.findOne({ email });
    if (!user) return null; // Nếu không tìm thấy người dùng, trả về null

    // So sánh mật khẩu người dùng nhập vào với mật khẩu đã mã hóa trong cơ sở dữ liệu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null; // Nếu không khớp mật khẩu, trả về null

    // Tạo token JWT nếu mật khẩu khớp
    const token = jwt.sign(
      { id: user.userId, email: user.email, role: 'tutor' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return { user, token };
  }
}