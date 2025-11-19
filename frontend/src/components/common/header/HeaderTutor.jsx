import './HeaderTutor.scss'
import logo from '@/assets/common/logoBK.svg'
import { useNavigate } from 'react-router-dom'
import Account from '@/assets/tutor/header/User_cicrle.svg'

const HeaderTutor = () => {
    const navigate = useNavigate()

    const handleHome = () => navigate('/')
    const handleOpenClass = () => navigate('/tutor/open-class')
    const handleListClass = () => navigate('/tutor/list-subjects')
    const handleProfile = () => navigate('/tutor/profile')

    return (
        <div className="header-tutor-container">
            <img src={logo} alt="logo" className="header-logo" onClick={handleHome} />
            <div className="header-tutor-content">
                <div className="content-left">
                    <div className="nav-item" onClick={handleHome}>
                        Trang chủ
                    </div>
                    <div className="nav-item" onClick={handleOpenClass}>
                        Mở lớp
                    </div>
                    <div className="nav-item" onClick={handleListClass}>
                        Danh sách lớp
                    </div>
                </div>

                {/* Phần bên phải: Tài khoản */}
                <div className="content-right">
                    <div className="nav-item" onClick={handleProfile}>
                        <img src={Account} alt="account" className="account-icon" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderTutor
