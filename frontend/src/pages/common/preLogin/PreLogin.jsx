import './PreLogin.scss'
import logoBK from '@/assets/common/logoBK.svg'
import { useLocation, useNavigate } from 'react-router-dom'

const PreLogin = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const fromState = location.state?.from

    const handleNavigate = path => {
        navigate(path, { state: { from: fromState } })
    }

    return (
        <div className="pre-login-container">
            <div className="box">
                <img src={logoBK} alt="logo" />
                <p>Đăng nhập</p>
                <div className="box__login" onClick={() => handleNavigate('/student/login')}>
                    Đăng nhập cho sinh viên
                </div>
                <div className="box__login" onClick={() => handleNavigate('/tutor/login')}>
                    Đăng nhập với giảng viên
                </div>
            </div>
        </div>
    )
}

export default PreLogin
