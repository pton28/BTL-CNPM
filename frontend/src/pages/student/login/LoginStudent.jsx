import './LoginStudent.scss'
import {ButtonLogin} from "@/components/common/ui/button/Button.jsx";
import {useNavigate} from "react-router-dom";

const LoginStudent = () => {
    const navigate = useNavigate();
    const handleLoginStudent = () => {
        //login
        navigate("/list-appointment")
    }
    return (
        <div className="form-login-container">
            <div className="box">
                <h1>Đăng nhập cho sinh viên</h1>
                <p>Vui lòng điền đầy đủ thông tin đăng nhập</p>

                <div className='input-container'>
                    <label>Email sinh viên</label>
                    <input placeholder='email@gmail.com'/>
                </div>

                <div className='input-container'>
                    <label>Mật khẩu</label>
                    <input placeholder='Mật khẩu' type='password' />
                </div>

                <button className='btn-login' onClick={handleLoginStudent}>
                    Login
                </button>
            </div>
        </div>
    )
}

export default LoginStudent
