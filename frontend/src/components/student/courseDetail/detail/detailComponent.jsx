import './detailComponent.scss'
import { useState } from 'react'
import FormChangeSchedule from '@/components/student/formChangeSchedule/formChangeSchedule.jsx'
import { useFetchAllSessionOfAMeeting } from '../../../../services/fetchAPI/useFetchAllSessionOfAMeeting'
import { useParams } from 'react-router-dom'

const DetailComponent = () => {

   const [showFormChangeSchedule, setShowFormChangeSchedule] = useState(false)
   const [selectedSSId, setSelectedSSId] = useState(null)
   const [mode, setMode] = useState(null) // Thêm state để lưu mode

   const { id } = useParams()
   const [refresh, setRefresh] = useState(true)
   const { data: list, loading: loading } = useFetchAllSessionOfAMeeting(refresh, id)




   const formatDate = dateStr => {
      if (!dateStr || dateStr === 'No') return 'No'
      return new Date(dateStr).toLocaleDateString('vi-VN', {
         day: '2-digit',
         month: '2-digit',
         year: 'numeric',
      })
   }
   
   const isPast = (dateStr, hourStr) => {
      if (dateStr === 'No') return false
      const [h, m] = hourStr.split(':').map(Number)

      const d = new Date(dateStr)
      d.setHours(h)
      d.setMinutes(m)
      d.setSeconds(0)

      const now = new Date()

      if (d.getTime() > now.getTime()) {
         return false
      } else {
         return true
      }
   }

   // Sửa hàm này để nhận 2 tham số
   const HandleChooseSlot = (ss_id, mode) => {
      setSelectedSSId(ss_id)
      setMode(mode) // Lưu mode vào state
      setShowFormChangeSchedule(true)
   }

   return (
      <div className="detail-appointment-container">
         <h2>Chi tiết các buổi học</h2>
         {!loading && console.log('list nek', list)}
         <table className="schedule-table">
            <thead>
               <tr>
                  <th>Buổi</th>
                  <th>Ngày diễn ra</th>
                  <th>Giờ</th>
                  <th>Địa điểm</th>
                  <th>Trạng thái</th>
                  <th>Nhận xét của giảng viên</th>
               </tr>
            </thead>
            <tbody>
               {!loading &&
                  list &&
                  list.length > 0 &&
                  list.map((ss, index) => (
                     <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{formatDate(ss.date) || 'Chưa có'}</td>
                        <td>{ss.start_time}</td>
                        <td>{ss.location}</td>
                        <td>{isPast(ss.date, ss.start_time) ? 'Đã diễn ra' : 'Sắp diễn ra'}</td>
                        {isPast(ss.date, ss.start_time) ? (
                           <td>Đóng góp xây dựng bài tốt, có tầm nhìn xa</td>
                        ) : (
                           <td>
                              <button
                                 className="change-btn"
                                 onClick={() => {
                                    const currentMode = ss.start_time !== 'No' ? 'change' : 'choose'
                                    HandleChooseSlot(ss.ss_id, currentMode)
                                 }}
                              >
                                 Xem lịch học
                              </button>
                           </td>
                        )}
                     </tr>
                  ))}
            </tbody>
         </table>

         {showFormChangeSchedule && (
            <FormChangeSchedule
               refresh={refresh}
               setRefresh={setRefresh}
               selectedSSId={selectedSSId}
               setShowFormChangeSchedule={setShowFormChangeSchedule}
            />
         )}
      </div>
   )

}

export default DetailComponent