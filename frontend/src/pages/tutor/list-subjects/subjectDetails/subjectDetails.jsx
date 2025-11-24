import './subjectDetails.scss'
import { useState } from 'react'
import CourseComponent from '@/components/tutor/courseDetail/course/courseComponent.jsx'
import DetailComponent from '@/components/tutor/courseDetail/detail/detailComponent.jsx'
import Button from '@/components/common/ui/button/buttonClickForm/button.jsx'

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

   const editButtonClassName = `custom-btn-edit ${status === 'schedule' ? 'hidden' : ''}`

   return (
      <div className="subject-details-wrapper">
         <div className="subject-details-container">
            <div className="header-section">
               <h1 className="subject-title">Kỹ năng Chuyên nghiệp cho Kỹ sư (CO2001)</h1>
               <Button className={editButtonClassName}>Chỉnh sửa</Button>
            </div>

            <div className="tabs-container">
               <Button
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

            <div className="content-body">{renderContent()}</div>
         </div>
      </div>
   )
}

export default SubjectDetails
