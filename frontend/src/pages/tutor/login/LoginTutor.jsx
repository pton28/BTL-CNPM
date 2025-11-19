import { useState } from 'react'
import './LoginTutor.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BASE_API } from '../../../constants'

const LoginTutor = () => {
   const navigate = useNavigate()

   // State lưu trữ email và password
   const [formData, setFormData] = useState({
      email: '',
      password: '',
   })

   // handle change cho input
   const handleChange = e => {
      const { name, value } = e.target
      setFormData(prev => ({
         ...prev,
         [name]: value, // cập nhật đúng field email hoặc password
      }))
   }

   const handleLoginTutor = async () => {
      try {
         const res = await axios.post(`${BASE_API}/tutor/login`, formData)

         console.log('Login success:', res.data)

         // Ví dụ: lưu token
         // localStorage.setItem('token', res.data.token)

         navigate('../list-subjects')
      } catch (error) {
         console.error('Login failed:', error)
      }
   }

   return (
      <div className="form-login-container">
         <div className="box">
            <h1>Đăng nhập cho giảng viên</h1>
            <p>Vui lòng điền đầy đủ thông tin đăng nhập</p>

            <div className="input-container">
               <label>Email giảng viên</label>
               <input
                  name="email"
                  placeholder="email@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
               />
            </div>

            <div className="input-container">
               <label>Mật khẩu</label>
               <input
                  name="password"
                  type="password"
                  placeholder="Mật khẩu"
                  value={formData.password}
                  onChange={handleChange}
               />
            </div>

            <button className="btn-login" onClick={handleLoginTutor}>
               Login
            </button>
         </div>
      </div>
   )
}

export default LoginTutor
