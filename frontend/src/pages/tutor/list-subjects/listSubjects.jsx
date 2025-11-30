// File: src/pages/...(đường dẫn của bạn).../listSubjects.jsx
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import './listSubjects.scss'

// IMPORT HOOK VỪA TẠO
// (Bạn nhớ sửa đường dẫn '../../hooks/...' cho đúng với cấu trúc thư mục của bạn nhé)
import { useFetchMeetingByTutor } from '@/services/fetchAPI/useFetchMeetingByTutor'

const listSubjects = () => {
   const navigate = useNavigate()

   // State dùng để trigger reload nếu cần (hiện tại chưa dùng nhưng cứ để sẵn chuẩn form)
   const [refresh, setRefresh] = useState(false)

   // GỌI HOOK: Lấy data và loading
   const { data: subjects, loading } = useFetchMeetingByTutor(refresh)
   console.log(subjects)
   // Hàm chuyển trang chi tiết kèm theo ID meeting
   const handleViewDetail = meetingId => {
      navigate(`/tutor/subject-details/${meetingId}`)
   }

   return (
      <div className="list-subject-title">
         <h1>Danh sách các môn giảng dạy của tôi</h1>
         <div className="list-subject-container">
            <h2>Thông tin chi tiết</h2>

            {/* --- XỬ LÝ TRẠNG THÁI LOADING --- */}
            {loading && (
               <div style={{ textAlign: 'center', padding: '20px' }}>
                  Đang tải dữ liệu lớp học...
               </div>
            )}

            {/* --- XỬ LÝ KHI KHÔNG CÓ DỮ LIỆU --- */}
            {!loading && subjects.length === 0 && (
               <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                  Hiện tại bạn chưa phụ trách môn học nào.
               </div>
            )}

            {/* --- HIỂN THỊ DANH SÁCH (MAP) --- */}
            {!loading &&
               subjects.map(item => (
                  <div className="subject-item" key={item.id}>
                     {/* Cột hình ảnh (Thumbnail) */}
                     <div
                        className="btn-thumbnail"
                        onClick={() => handleViewDetail(item.id)}
                        style={{ cursor: 'pointer' }}
                     ></div>

                     <div className="subject-info">
                        <div className="btn-subject-name" onClick={() => handleViewDetail(item.id)}>
                           {item.title}
                        </div>
                        <div className="subject-schedule">Ngày bắt đầu: {item.start_date}</div>
                        <div className="subject-detail">
                           Số buổi: {item.session_count} | Hình thức: {item.method}
                        </div>
                     </div>
                  </div>
               ))}

            {/* --- PHÂN TRANG (PAGINATION) --- */}
            {/* Giữ nguyên giao diện tĩnh, xử lý logic sau nếu danh sách quá dài */}
            {subjects.length > 0 && (
               <div className="pagination-wrapper">
                  <a href="#" className="page-link">
                     <FontAwesomeIcon icon={faChevronLeft} />
                  </a>
                  <a href="#" className="page-link active">
                     1
                  </a>
                  <a href="#" className="page-link">
                     2
                  </a>
                  <a href="#" className="page-link">
                     3
                  </a>
                  <span className="page-dots">...</span>
                  <a href="#" className="page-link">
                     <FontAwesomeIcon icon={faChevronRight} />
                  </a>
               </div>
            )}
         </div>
      </div>
   )
}

export default listSubjects