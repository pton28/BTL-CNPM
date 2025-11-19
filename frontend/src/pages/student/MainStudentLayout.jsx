import Header from '../../components/common/header/HeaderStudent.jsx'
import { Outlet } from 'react-router-dom'

const MainStudentLayout = () => {
   return (
      <>
         <Header />
         <Outlet />
      </>
   )
}

export default MainStudentLayout
