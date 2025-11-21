import './Header.scss'
import logo from '@/assets/common/logoBK.svg'
import { useNavigate } from 'react-router-dom'

const Header = () => {
<<<<<<< HEAD
    const navigate = useNavigate()

    const handleHome = () => {
        navigate('/')
    }

    const handlePreLogin = () => {
        navigate('/pre-login')
    }

    return (
        <div className="header-container">
            <img src={logo} alt="logo" onClick={handleHome} />
            <div className="header-content">
                <div className="nav-item" onClick={handleHome}>
                    Trang chủ
                </div>

                <div className="nav-item" onClick={handlePreLogin}>
                    Đăng nhập
                </div>
            </div>
        </div>
    )
=======
   const navigate = useNavigate()

   const handleHome = () => {
      navigate('/')
   }

   const handlePreLogin = () => {
      navigate('/pre-login')
   }

   return (
      <div className="header-container">
         <img src={logo} alt="logo" onClick={handleHome} />
         <div className="header-content">
            <div className="nav-item" onClick={handleHome}>
               Trang chủ
            </div>

            <div className="nav-item" onClick={handlePreLogin}>
               Đăng nhập
            </div>
         </div>
      </div>
   )
>>>>>>> trinh
}

export default Header
