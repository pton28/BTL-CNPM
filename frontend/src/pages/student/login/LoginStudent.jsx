import { useState } from 'react'
import './LoginStudent.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BASE_API } from '../../../constants'

const LoginStudent = () => {
   const navigate = useNavigate()

   // State lưu email + password
   const [formData, setFormData] = useState({
      email: '',
      password: '',
   })

   // Xử lý nhập input
   const handleChange = e => {
      const { name, value } = e.target
      setFormData(prev => ({
         ...prev,
         [name]: value, // cập nhật đúng field
      }))
   }

   const handleLoginStudent = async () => {
      try {
         const res = await axios.post(`${BASE_API}/student/login`, formData)

         console.log('Student login success:', res.data.data._id)

         localStorage.setItem('id', res.data.data._id)

         navigate('/list-appointment')
      } catch (error) {
         console.error('Student login failed:', error)
      }
   }

   return (
      <div className="form-login-container">
         <div className="box">
            <h1>Đăng nhập cho sinh viên</h1>
            <p>Vui lòng điền đầy đủ thông tin đăng nhập</p>

            <div className="input-container">
               <label>Email sinh viên</label>
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

            <button className="btn-login" onClick={handleLoginStudent}>
               Login
            </button>
         </div>
      </div>
   )
}

export default LoginStudent
