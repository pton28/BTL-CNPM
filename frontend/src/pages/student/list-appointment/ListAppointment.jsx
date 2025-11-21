import './ListAppointment.scss'
import Avt from '@/assets/student/avt.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFetchListAppointmentByStudent } from '@/services/fetchAPI/useFetchListAppointmentByStudent'

const ListAppointment = () => {
   const navigate = useNavigate()

   const [refreshKey, setRefreshKey] = useState(true)
   const { data: appointmentList, loading } = useFetchListAppointmentByStudent(refreshKey)

   const handleRefresh = () => {
      setRefreshKey(prev => !prev)
   }

   return (
      <div className="list-appointment-container">
         <div className="header-appointment-container">
            <h2>Danh sách lớp của tôi</h2>
            <button className="btn-border" onClick={handleRefresh}>
               {loading ? 'Đang tải...' : 'Cập nhật lịch học'}
            </button>
         </div>

         <div className="card-list">
            {/* Case 1: Đang Loading */}
            {loading && <p className="loading-text">Đang tải dữ liệu...</p>}

            {/* Case 2: Có dữ liệu */}
            {!loading &&
               appointmentList &&
               appointmentList.length > 0 &&
               appointmentList.map(
                  (item, index) =>
                     item.status == 'studying' && (
                        <div className="card-item" key={item._id || index}>
                           <div className="card-item-title">
                              <img src={Avt} alt="avt" />

                              <div className="card-item-info">
                                 <p className="name-teacher">{item.tutorName || 'Giáo viên'}</p>
                                 <p className="major">
                                    Lĩnh vực: {item.majorName || 'Chưa cập nhật'}
                                 </p>
                              </div>
                           </div>

                           <p className="name-course">
                              {item.meeting_id.title_meeting || 'Chi tiết cuộc hẹn...'}
                           </p>

                           <button
                              className="btn-detail"
                              onClick={() => navigate(`/list-appointment/${item.meeting_id._id}`)}
                           >
                              Xem chi tiết
                           </button>
                        </div>
                     )
               )}

            {/* Case 3: Không có dữ liệu */}
            {!loading && appointmentList?.length === 0 && <p>Bạn chưa có lịch học nào.</p>}
         </div>
      </div>
   )
}

export default ListAppointment
