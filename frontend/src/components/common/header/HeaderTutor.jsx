import './HeaderTutor.scss'
import logo from '@/assets/common/logoBK.svg'
import { useNavigate } from 'react-router-dom'
import Account from '@/assets/tutor/header/User_cicrle.svg'
const HeaderTutor = () => {
    const navigate = useNavigate()
    return (
        <div className="header-tutor-container">
            <img src={logo} alt="logo" />
            <div className="header-tutor-content">
                <div className={'content-left'}>
                    <p>Trang chủ</p>
                    <p>Mở lớp</p>
                    <p>Danh sách lớp</p>
                </div>

                <div className={'content-right'}>
                    <img src={Account} alt="account" />
                </div>
            </div>
        </div>
    )
}

export default HeaderTutor
