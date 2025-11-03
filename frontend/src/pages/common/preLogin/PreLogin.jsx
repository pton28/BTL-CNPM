import './PreLogin.scss'
import logoBK from '@/assets/common/logoBK.svg'
const PreLogin = () => {
    return (
        <div className="pre-login-container">
            <div className="box">
                <img src={logoBK} alt="logo" />
                <p>Đăng nhập</p>
                <div className="box__login">
                    Đăng nhập cho sinh viên
                </div>
                <div className="box__login">
                    Đăng nhập với giảng viên
                </div>
            </div>
        </div>
    )
}

export default PreLogin