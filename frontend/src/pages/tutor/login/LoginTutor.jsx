import './LoginTutor.scss'
import {ButtonLogin} from "@/components/common/ui/button/Button.jsx";

const LoginTutor = () => {
    return (
        <div className="form-login-container">
            <div className="box">
                <h1>Đăng nhập cho giảng viên</h1>
                <p>Vui lòng điền đầy đủ thông tin đăng nhập</p>

                <div className='input-container'>
                    <label>Email giảng viên</label>
                    <input placeholder='email@gmail.com'/>
                </div>

                <div className='input-container'>
                    <label>Mật khẩu</label>
                    <input placeholder='Mật khẩu' type='password' />
                </div>

                <ButtonLogin />
            </div>
        </div>
    )
}

export default LoginTutor
