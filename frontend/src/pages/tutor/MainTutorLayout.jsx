import Header from '../../components/common/header/HeaderTutor.jsx'
import { Outlet } from 'react-router-dom'

const MainTutorLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default MainTutorLayout
