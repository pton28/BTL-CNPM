import { useState } from 'react'
import './LoginStudent.scss'
import { ButtonLogin } from '@/components/common/ui/button/Button.jsx'
import { useNavigate, useLocation } from 'react-router-dom'
import { BASE_API } from '../../../constants'
import axios from 'axios';
import { setTokens } from '@/services/auth.services'

const LoginStudent = () => {
   const navigate = useNavigate()
   const location = useLocation()

   const from = location.state?.from?.pathname || '/student/list-appointment'

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')


   const handleLoginStudent = async () => {
      try {
         const response = await axios.post(`${BASE_API}/auth/login/student`, {email, password})

         console.log('1')

         setTokens({
            access_token: response.data.token,
         })
         localStorage.setItem('id', response.data.user._id)
         // Bước 3: Điều hướng
         navigate(from, { replace: true })
      } catch (error) {
         console.log('error login', error)
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
               Đăng nhập
            </button>

            {/* <ButtonLogin /> */}
         </div>
      </div>
   )
}

export default LoginStudent
