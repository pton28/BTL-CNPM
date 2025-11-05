import './Header.scss'
import logo from '@/assets/common/logoBK.svg';
import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    return (
        <div className="header-container">
            <img src={logo} alt="logo" />
            <div className="header-content">
                <span>Trang chủ</span>
                <span onClick={() => navigate('/pre-login')}>Đăng nhập</span>
            </div>
        </div>
    )
}

export default Header