import { useState } from 'react'
import './LoginTutor.scss'
import axios from 'axios'
import { ButtonLogin } from '@/components/common/ui/button/Button.jsx'
import { useNavigate, useLocation } from 'react-router-dom'
import { BASE_API } from '../../../constants'

const LoginTutor = () => {
   const navigate = useNavigate()
   const location = useLocation()

   const from = location.state?.from?.pathname || '/tutor/list-subjects'

   // State lưu trữ email và password
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const handleLoginTutor = async () => {
      try {
         // const response = await loginAPI(email, password);
         // const { user, accessToken } = response.data;

         // --- DỮ LIỆU GIẢ LẬP TỪ BE TRẢ VỀ ---
         const fakeResponseData = {
            accessToken: 'eyJhbGciOiJIUzI1NiIs...',
            user: {
               id: '2313640',
               name: 'Nguyễn Văn A',
               role: 'tutor', // Quan trọng
               email: 'gv@hcmut.edu.vn',
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
            <h1>Đăng nhập cho giảng viên</h1>
            <p>Vui lòng điền đầy đủ thông tin đăng nhập</p>

            <div className="input-container">
               <label>Email giảng viên</label>
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

            <button className="btn-login" onClick={handleLoginTutor}>
               Login
            </button>
         </div>
      </div>
   )
}

export default LoginTutor
