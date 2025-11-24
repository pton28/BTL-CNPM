import './HeaderStudent.scss'
import logo from '@/assets/common/logoBK.svg'
import { useNavigate } from 'react-router-dom'
import Account from '@/assets/student/header/User_cicrle.svg'
const HeaderStudent = () => {
   const navigate = useNavigate()

   const handleHome = () => navigate('/')
   const handleSearchCourse = () => navigate('/student/search-course')
   const handleListAppointment = () => navigate('/student/list-appointment')
   const handleProfile = () => navigate('/student/profile')

   return (
      <div className="header-tutor-container">
         <img src={logo} alt="logo" className="header-logo" onClick={handleHome} />
         <div className="header-tutor-content">
            <div className="content-left">
               <div className="nav-item" onClick={handleHome}>
                  Trang chủ
               </div>
               <div className="nav-item" onClick={handleSearchCourse}>
                  Tìm kiếm khóa học
               </div>
               <div className="nav-item" onClick={handleListAppointment}>
                  Danh sách của tôi
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

export default HeaderStudent
