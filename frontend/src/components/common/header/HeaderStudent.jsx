import './HeaderStudent.scss'
import logo from '@/assets/common/logoBK.svg'
import { useNavigate } from 'react-router-dom'
import Account from '@/assets/student/header/User_cicrle.svg'
const HeaderStudent = () => {
    const navigate = useNavigate()
    return (
        <div className="header-student-container">
            <img src={logo} alt="logo" />
            <div className="header-student-content">
                <div className={'content-left'}>
                    <p>Trang chủ</p>
                    <p>Tìm kiếm khóa học</p>
                    <p>Danh sách của tôi</p>
                </div>

                <div className={'content-right'}>
                    <img src={Account} alt="account" />
                </div>
            </div>
        </div>
    )
}

export default HeaderStudent
