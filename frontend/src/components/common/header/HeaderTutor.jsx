import './HeaderTutor.scss'
import logo from '@/assets/common/logoBK.svg'
import { useNavigate } from 'react-router-dom'
import Account from '@/assets/tutor/header/User_cicrle.svg'
import React, { useState } from 'react'

const HeaderTutor = () => {
   const navigate = useNavigate()
   const [showDropdown, setShowDropdown] = useState(false) // State quản lý ẩn hiện menu

   const handleHome = () => navigate('/')
   const handleOpenClass = () => navigate('/tutor/open-class')
   const handleListClass = () => navigate('/tutor/list-subjects')
   // const handleProfile = () => navigate('/tutor/profile')

   const handleLogout = () => {
      localStorage.clear()
      console.log('Đăng xuất thành công')
      navigate('/')
   }

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

            <div className="content-right">
               <div
                  className="account-wrapper"
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
               >
                  <div className="nav-item">
                     <img src={Account} alt="account" className="account-icon" />
                  </div>

                  {showDropdown && (
                     <div className="dropdown-menu">
                        <div className="dropdown-item" onClick={handleLogout}>
                           Đăng xuất
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   )
}

export default HeaderTutor
