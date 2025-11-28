import { useEffect, useState } from 'react'
import './HistoryAppointmentStudent.scss'
import { useFetchListAppointmentByStudent } from '@/services/fetchAPI/useFetchListAppointmentByStudent'

const HistoryAppointmentStudentComponent = props => {
   const history = props.history || 'all'

   const [refresh, setRefresh] = useState(false)
   const { data: listAppointment, loading } = useFetchListAppointmentByStudent(refresh)

   const [appointmentFilter, setAppointmentFilter] = useState([])

   useEffect(() => {
      if (loading || !listAppointment) return

      const now = new Date()

      let filtered = []

      if (history === 'all') {
         filtered = listAppointment
      } else if (history === 'upcoming') {
         // Lọc những khóa học chưa bắt đầu hoặc đang học (chưa hoàn thành)
         filtered = listAppointment.filter(appt => {
            const startDate = new Date(appt.meeting_id?.date_of_event)
            // console.log('startDate', startDate)
            const isNotStarted = startDate > now
            // const isInProgress = appt.progress < 100 && startDate <= now
            return isNotStarted 
         })
         
      }
      else if (history === 'studying') {
         filtered = listAppointment.filter(appt => {
            const startDate = new Date(appt.meeting_id?.date_of_event)
            // console.log('startDate', startDate)
            // const isNotStarted = startDate > now
            const isInProgress = appt.progress < 100 && startDate <= now
            return isInProgress 
         })
         
      } else if (history === 'past') {
         // Lọc những khóa học đã hoàn thành (progress = 100%)
         filtered = listAppointment.filter(appt => appt.progress === 100)
      } else {
         // Lọc theo status khác (nếu có)
         filtered = listAppointment.filter(appt => appt.status === history)
      }

      setAppointmentFilter(filtered)
   }, [history, listAppointment, loading])

   const formatDate = dateStr => {
      if (!dateStr) return ''
      return new Date(dateStr).toLocaleDateString('vi-VN', {
         day: '2-digit',
         month: '2-digit',
         year: 'numeric',
      })
   }

   const getStatusBadge = appt => {
      const now = new Date()
      const startDate = new Date(appt.meeting_id?.date_of_event)

      if (appt.progress === 100) {
         return <span className="status-badge completed">Đã hoàn thành</span>
      } else if (startDate > now) {
         return <span className="status-badge upcoming">Sắp diễn ra</span>
      } else {
         return <span className="status-badge in-progress">Đang học</span>
      }
   }

   if (loading) return <p className="loading-text">Đang tải dữ liệu...</p>

   return (
      <div className="list-history-container">
         <h2>
            Danh sách {history === 'all' ? 'tất cả' : history === 'upcoming' ? 'sắp diễn ra' : 'đã hoàn thành'} khóa
            học của bạn
            {appointmentFilter?.length > 0 && (
               <span className="result-count"> ({appointmentFilter.length} khóa học)</span>
            )}
         </h2>

         {!appointmentFilter || appointmentFilter.length === 0 ? (
            <p className="no-data">Không có khóa học nào</p>
         ) : (
            <table className="course-table">
               <thead>
                  <tr>
                     <th>Tên khóa học</th>
                     <th>Ngày bắt đầu</th>
                     <th>Số lượng buổi</th>
                     <th>Tiến độ</th>
                     <th>Giảng viên</th>
                     <th>Trạng thái</th>
                  </tr>
               </thead>
               <tbody>
                  {appointmentFilter.map(appt => (
                     <tr key={appt._id}>
                        <td title={appt.meeting_id?.title_meeting}>{appt.meeting_id?.title_meeting || 'N/A'}</td>
                        <td>{formatDate(appt.meeting_id?.date_of_event)}</td>
                        <td className="text-center">{appt.meeting_id?.session_count || 0}</td>
                        <td className="text-center">
                           <span
                              className={`progress-badge ${
                                 appt.progress === 100
                                    ? 'completed'
                                    : appt.progress > 0
                                      ? 'in-progress'
                                      : 'not-started'
                              }`}
                           >
                              {appt.progress}%
                           </span>
                        </td>
                        <td>{appt.tutorName || 'N/A'}</td>
                        <td>{getStatusBadge(appt)}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         )}
      </div>
   )
}

export default HistoryAppointmentStudentComponent