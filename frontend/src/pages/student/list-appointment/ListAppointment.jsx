import './ListAppointment.scss'
import Avt from '@/assets/student/avt.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFetchListAppointmentByStudent } from '../../../services/fetchAPI/useFetchListAppointmentByStudent'

const ListAppointment = () => {
   const navigate = useNavigate()

   const [refreshKey, setRefreshKey] = useState(true)
   const { data: appointmentList, loading } = useFetchListAppointmentByStudent(refreshKey)

   const handleRefresh = () => {
      navigate('/student/history')
   }

   return (
      <div className="list-appointment-container">
         <div className="header-appointment-container">
            <h2>Danh sách lớp của tôi</h2>
            <button className="btn-border" onClick={handleRefresh}>
               {loading ? 'Đang tải...' : 'Xem lịch sử'}
            </button>
         </div>

         <div className="card-list">
            {/* Case 1: Đang Loading */}
            {loading && <p className="loading-text">Đang tải dữ liệu...</p>}
            {/* {console.log('data in cmn', appointmentList, appointmentList.length)} */}
            {/* Case 2: Có dữ liệu */}
            {/* {!loading && console.log('app', appointmentList)} */}
            {!loading &&
               appointmentList &&
               appointmentList.length > 0 &&
               appointmentList.map(
                  (item, index) =>
                     item.status == 'studying' && (
                        <div className="card-item" key={item._id || index}>
                           <div className="card-item-title">
                              {/* Hiển thị avatar thật nếu có, không thì dùng ảnh mặc định */}
                              <img src={Avt} alt="avt" />

                              <div className="card-item-info">
                                 {/* Hiển thị tên giáo viên từ dữ liệu đã gộp */}
                                 <p className="name-teacher">{item.tutorName || 'Giáo viên'}</p>
                                 <p className="major">
                                    {/* Hiển thị chuyên ngành từ dữ liệu đã gộp */}
                                    Lĩnh vực: {item.majorName || 'Chưa cập nhật'}
                                 </p>
                              </div>
                           </div>

                           <p className="name-course">
                              {/* Tên khóa học/Tiêu đề cuộc hẹn */}
                              {item.meeting_id.title_meeting || 'Chi tiết cuộc hẹn...'}
                           </p>

                           <button
                              className="btn-detail"
                              onClick={() => navigate(`/student/list-appointment/${item.meeting_id._id}`)}
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
