import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './common/header/Header.jsx'
import img1 from '@/assets/common/bk1.jpg'
import img2 from '@/assets/common/bk2.jpg'
import img3 from '@/assets/common/bk3.jpg'
import img4 from '@/assets/common/bk4.jpg'
import img5 from '@/assets/common/bk5.jpg'
import './MainLayout.scss'
import HeaderStudent from '@/components/common/header/HeaderStudent.jsx'
import HeaderTutor from '@/components/common/header/HeaderTutor.jsx'
import { getCurrentUser } from '@/services/auth.services';


const MainLayout = () => {
   const location = useLocation()
   const showSlide = location.pathname === '/'

   const isAuthPage =
      location.pathname === '/pre-login' ||
      location.pathname === '/student/login' ||
      location.pathname === '/tutor/login'

   const validateAuth = () => {
      const user = getCurrentUser()
      console.log('user', user)
      if(!user) return <Header />
      const role = user?.role

      switch (role) {
         case 'student':
            return <HeaderStudent />
         case 'tutor':
            return <HeaderTutor />
      
         default:
            return <Header />
      }
   }
   const images = [img1, img2, img3, img4, img5]
   const [currentIndex, setCurrentIndex] = useState(0)
   const [fade, setFade] = useState(false)

   useEffect(() => {
      if (!showSlide) return
      const interval = setInterval(() => handleNext(), 5000)
      return () => clearInterval(interval)
   }, [currentIndex])

   const handleNext = () => {
      setFade(true)
      setTimeout(() => {
         setCurrentIndex(prev => (prev + 1) % images.length)
         setFade(false)
      }, 500)
   }

   return (
      <div className="main-layout-container">
         {validateAuth()}

         {showSlide && (
            <div className="slideshow-container">
               <img
                  src={images[currentIndex]}
                  alt="BK slideshow"
                  className={`slideshow-img ${fade ? 'fade' : ''}`}
               />
            </div>
         )}

         <Outlet />
      </div>
   )
}

export default MainLayout
