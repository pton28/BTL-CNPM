import { useState } from 'react'
import './LoginStudent.scss'
import axios from 'axios'
import { ButtonLogin } from '@/components/common/ui/button/Button.jsx'
import { useNavigate, useLocation } from 'react-router-dom'
import { BASE_API } from '../../../constants'

const LoginStudent = () => {
   const navigate = useNavigate()
   const location = useLocation()

   const from = location.state?.from?.pathname || '/student/list-appointment'

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   // const handleLoginStudent = async () => {
   //    try {
   //       const res = await axios.post(`${BASE_API}/student/login`, formData)

   //       console.log('Student login success:', res.data.data._id)

   //       localStorage.setItem('id', res.data.data._id)

   //       navigate('/list-appointment')
   //    } catch (error) {
   //       console.error('Student login failed:', error)
   //    }
   // }

   const handleLoginStudent = async () => {
      try {
         // const response = await loginAPI(email, password);
         // const { user, accessToken } = response.data;

         // --- DỮ LIỆU GIẢ LẬP TỪ BE TRẢ VỀ ---
         const fakeResponseData = {
            accessToken: 'eyJhbGciOiJIUzI1NiIs...',
            user: {
               id: '2313640',
               name: 'Nguyễn Văn A',
               role: 'student',
               email: 'sv@hcmut.edu.vn',
            },
         }

         const { user, accessToken } = fakeResponseData

         localStorage.setItem('accessToken', accessToken)
         localStorage.setItem('user', JSON.stringify(user))

         // Bước 3: Điều hướng
         navigate(from, { replace: true })
      } catch (error) {
         alert('Đăng nhập thất bại!')
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
                  type="email"
                  placeholder="email@gmail.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
               />
            </div>

            <div className="input-container">
               <label>Mật khẩu</label>
               <input
                  type="password"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
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
