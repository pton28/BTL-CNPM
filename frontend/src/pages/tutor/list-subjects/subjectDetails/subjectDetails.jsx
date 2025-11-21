import './subjectDetails.scss'
import { useState } from 'react'
import CourseComponent from '@/components/tutor/courseDetail/course/courseComponent.jsx'
import DetailComponent from '@/components/tutor/courseDetail/detail/detailComponent.jsx'
// import Unauthorized from '@/pages/common/unauthorized/Unauthorized.jsx'
import Button from '@/components/common/ui/button/buttonClickForm/button.jsx'

<<<<<<< HEAD
/**
 * @typedef {"course" | "schedule"} statusType
 */
const subjectDetails = () => {
    const [status, setStatus] = useState('course')
    const mapStatus = () => {
        if (status === 'course') return <CourseComponent />
        else if (status === 'evaluate') return <ScheduleComponent />
        else return <Unauthorized />
    }
    return (
        <div className="inner-appointment-container">
            <div className="box">
                <h1>Kỹ năng Chuyên nghiệp cho Kỹ sư (CO2001)</h1>
                <button className='btn-edit'>
                    Chỉnh sửa
                </button>
                <div className="button-container">
                    <button
                        className={status === 'course' ? 'active' : ''}
                        onClick={() => setStatus('course')}
                    >
                        Khóa học
                    </button>
                    <button
                        className={status === 'schedule' ? 'active' : ''}
                        onClick={() => setStatus('evaluate')}
                    >
                        Lịch giảng dạy
                    </button>
                </div>
                {mapStatus()}
            </div>
        </div>
    )
=======
const SubjectDetails = () => {
   // Mặc định hiển thị tab 'course'
   const [status, setStatus] = useState('course')

   const renderContent = () => {
      switch (status) {
         case 'course':
            return <CourseComponent />
         case 'schedule':
            return <DetailComponent />
         default:
            return <CourseComponent />
      }
   }

   return (
      // 1. Sử dụng đúng class "subject-details-wrapper" từ file SCSS
      <div className="subject-details-wrapper">
         {/* 2. Sử dụng đúng class "subject-details-container" */}
         <div className="subject-details-container">
            {/* Header section khớp với SCSS */}
            <div className="header-section">
               <h1 className="subject-title">Kỹ năng Chuyên nghiệp cho Kỹ sư (CO2001)</h1>
               <Button className="custom-btn-edit">Chỉnh sửa</Button>
            </div>

            {/* 3. Sử dụng đúng class "tabs-container" */}
            <div className="tabs-container">
               <Button
                  // Nếu active thì thêm class active để đổi màu nền
                  className={`custom-tab-btn ${status === 'course' ? 'active' : ''}`}
                  onClick={() => setStatus('course')}
               >
                  Khóa học
               </Button>

               <Button
                  className={`custom-tab-btn ${status === 'schedule' ? 'active' : ''}`}
                  onClick={() => setStatus('schedule')}
               >
                  Lịch giảng dạy
               </Button>
            </div>

            {/* Phần nội dung thay đổi */}
            <div className="content-body">{renderContent()}</div>
         </div>
      </div>
   )
>>>>>>> trinh
}

export default SubjectDetails
