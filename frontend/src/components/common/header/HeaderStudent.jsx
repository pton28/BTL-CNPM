import './HeaderStudent.scss'
import logo from '@/assets/common/logoBK.svg'
import { useNavigate, useLocation } from 'react-router-dom'
import Account from '@/assets/student/header/User_cicrle.svg'
import { useState, useEffect } from 'react'

const HeaderStudent = () => {
   const navigate = useNavigate()
   const location = useLocation()
   const [activeItem, setActiveItem] = useState('home')

   // Cập nhật activeItem khi URL thay đổi
   useEffect(() => {
      const path = location.pathname
      if (path === '/') {
         setActiveItem('home')
      } else if (path.includes('/student/search-course')) {
         setActiveItem('search-course')
      } else if (path.includes('/student/list-appointment')) {
         setActiveItem('list-appointment')
      } else if (path.includes('/student/profile')) {
         setActiveItem('profile')
      }
   }, [location.pathname])

   const mapNavigate = e => {
      const name = e.target.dataset.name
      if (!name) return

      setActiveItem(name) // Set active ngay khi click
      
      switch (name) {
         case 'home':
            navigate('/')
            break

         case 'search-course':
            navigate('/student/search-course')
            break

         case 'list-appointment':
            navigate('/student/list-appointment')
            break

         case 'profile':
            navigate('/student/profile')
            break

         case 'account':
            navigate('/student/history')
            break
         default:
            break
      }
   }

   return (
      <div className="header-tutor-container">
         <img 
            src={logo} 
            alt="logo" 
            className="header-logo" 
            data-name="home" 
            onClick={e => mapNavigate(e)} 
         />
         <div className="header-tutor-content">
            <div className="content-left">
               <div 
                  className={`nav-item ${activeItem === 'home' ? 'item-active' : ''}`}
                  data-name="home" 
                  onClick={e => mapNavigate(e)}
               >
                  Trang chủ
               </div>
               <div 
                  className={`nav-item ${activeItem === 'search-course' ? 'item-active' : ''}`}
                  data-name="search-course" 
                  onClick={e => mapNavigate(e)}
               >
                  Tìm kiếm khóa học
               </div>
               <div 
                  className={`nav-item ${activeItem === 'list-appointment' ? 'item-active' : ''}`}
                  data-name="list-appointment" 
                  onClick={e => mapNavigate(e)}
               >
                  Danh sách của tôi
               </div>
            </div>

            <div className="content-right">
               <div 
                  className={`nav-item ${activeItem === 'profile' ? 'item-active' : ''}`}
                 
                  onClick={e => mapNavigate(e)}
               >
                  <img src={Account} alt="account" className="account-icon" data-name='account'/>
               </div>
            </div>
         </div>
      </div>
   )
}

export default HeaderStudent