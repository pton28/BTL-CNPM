import './subjectDetails.scss'
import { useState } from 'react'
import CourseComponent from '@/components/tutor/courseDetail/course/courseComponent.jsx'
import ScheduleComponent from '@/components/tutor/courseDetail/evaluate/evaluateComponent.jsx'
import Unauthorized from '@/pages/common/unauthorized/Unauthorized.jsx'

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
            <button className="btn-edit">Chỉnh sửa</button>
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
}

export default subjectDetails
