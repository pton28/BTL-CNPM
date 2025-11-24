import React, { useState, useEffect, useMemo } from 'react'
import './detailComponent.scss'
import Button from '@/components/common/ui/button/buttonClickForm/button.jsx'
import { FaChevronLeft, FaTimes } from 'react-icons/fa'
// import axios from 'axios'

// --- 1. DỮ LIỆU GIẢ (MOCK DATA) ---
const MOCK_SCHEDULES = [
   {
      id: 1,
      date: '31/10/2025',
      time: '07:00 - 09:00',
      method: 'Trực tiếp',
      location: 'H6 - 203 / Cơ sở 2',
      courseName: 'Kỹ năng Chuyên nghiệp cho Kỹ sư',
   },
   {
      id: 2,
      date: '20/10/2025',
      time: '07:00 - 09:00',
      method: 'Trực tuyến',
      location: 'Google Meet',
      courseName: 'Kỹ năng Chuyên nghiệp cho Kỹ sư',
   },
   {
      id: 3,
      date: '15/11/2025', // Thay đổi ngày để kiểm tra sắp xếp
      time: '07:00 - 09:00',
      method: 'Trực tiếp',
      location: 'H6 - 203 / Cơ sở 2',
      courseName: 'Kỹ năng Chuyên nghiệp cho Kỹ sư',
   },
   {
      id: 4, // Lịch thứ 4 để kiểm tra phân trang
      date: '05/12/2025',
      time: '09:00 - 11:00',
      method: 'Trực tuyến',
      location: 'Zoom Meeting',
      courseName: 'Kỹ năng Chuyên nghiệp cho Kỹ sư',
   },
   {
      id: 5, // Lịch thứ 5 để kiểm tra phân trang
      date: '01/12/2025',
      time: '09:00 - 11:00',
      method: 'Trực tuyến',
      location: 'Zoom Meeting',
      courseName: 'Kỹ năng Chuyên nghiệp cho Kỹ sư',
   },
]

const MOCK_STUDENTS_BY_SESSION = [
   // ... (giữ nguyên MOCK_STUDENTS_BY_SESSION)
   {
      id: 101,
      name: 'Nguyễn Văn A',
      mssv: '2313001',
      email: 'a.nguyen@hcmut.edu.vn',
      status: 'pending',
      progress: '',
      comment: '',
   },
   {
      id: 102,
      name: 'Trần Thị B',
      mssv: '2313002',
      email: 'b.tran@hcmut.edu.vn',
      status: 'pending',
      progress: '',
      comment: '',
   },
   {
      id: 103,
      name: 'Lê Văn C',
      mssv: '2313003',
      email: 'c.le@hcmut.edu.vn',
      status: 'done',
      progress: '80',
      comment: 'Tốt',
   },
]

// Hằng số phân trang
const ITEMS_PER_PAGE = 3
const parseDate = dateStr => {
   const [day, month, year] = dateStr.split('/')
   return new Date(year, month - 1, day)
}

const DetailComponent = () => {
   // --- STATE QUẢN LÝ DỮ LIỆU ---

   // 1. Danh sách lịch giảng dạy
   const [schedules] = useState(MOCK_SCHEDULES) // Không cần setSchedules nữa

   // 2. Danh sách sinh viên của buổi học đang chọn
   const [students, setStudents] = useState([])

   // State UI
   const [currentView, setCurrentView] = useState('list') // 'list' | 'students'
   const [selectedSession, setSelectedSession] = useState(null)

   // State Modal
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [editingStudent, setEditingStudent] = useState(null)
   const [formData, setFormData] = useState({ progress: '', comment: '' })

   // *** STATE PHÂN TRANG MỚI ***
   const [currentPage, setCurrentPage] = useState(1)

   // --- LOGIC SẮP XẾP VÀ PHÂN TRANG ---
   const sortedAndPaginatedSchedules = useMemo(() => {
      // 1. Sắp xếp: Ưu tiên lịch sắp xảy ra gần nhất (ngày lớn hơn => gần hiện tại hơn)
      const sorted = [...schedules].sort((a, b) => {
         const dateA = parseDate(a.date)
         const dateB = parseDate(b.date)
         // Sắp xếp giảm dần để ngày lớn nhất (gần nhất) lên đầu
         return dateB - dateA
      })

      // 2. Phân trang
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
      const endIndex = startIndex + ITEMS_PER_PAGE

      // Dữ liệu cho trang hiện tại
      return sorted.slice(startIndex, endIndex)
   }, [schedules, currentPage])

   const totalPages = Math.ceil(schedules.length / ITEMS_PER_PAGE)

   // Mảng chứa số trang: [1, 2, 3, ...]
   const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

   // --- HÀM XỬ LÝ LOGIC ---

   const handleViewStudents = async session => {
      setSelectedSession(session)
      setStudents(MOCK_STUDENTS_BY_SESSION)
      setCurrentView('students')
   }

   const handleBackToList = () => {
      setSelectedSession(null)
      setStudents([])
      setCurrentView('list')
   }

   const handleOpenAssessModal = student => {
      setEditingStudent(student)
      setFormData({
         progress: student.progress || '',
         comment: student.comment || '',
      })
      setIsModalOpen(true)
   }

   const handleSaveAssessment = async () => {
      if (!editingStudent) return

      console.log('Lưu đánh giá:', {
         studentId: editingStudent.id,
         ...formData,
      })

      const updatedStudents = students.map(s =>
         s.id === editingStudent.id ? { ...s, status: 'done', ...formData } : s
      )
      setStudents(updatedStudents)
      setIsModalOpen(false)
   }

   const handlePageChange = page => {
      if (page >= 1 && page <= totalPages) {
         setCurrentPage(page)
      }
   }

   // --- CÁC PHẦN RENDER GIAO DIỆN ---

   const renderScheduleList = () => (
      <div className="schedule-list-view">
         <div className="schedule-cards-container">
            {/* SỬ DỤNG DỮ LIỆU ĐÃ SẮP XẾP VÀ PHÂN TRANG */}
            {sortedAndPaginatedSchedules.map(item => (
               <div key={item.id} className="schedule-card">
                  <div className="card-left">
                     <h3 className="date-title">Ngày {item.date}</h3>
                     <div className="info-row">
                        <span className="label">Thời gian học</span>
                        <div className="value-box">{item.time}</div>
                     </div>
                     <div className="info-row">
                        <span className="label">Phương thức</span>
                        <div className="value-box">{item.method}</div>
                     </div>
                     <div className="info-row">
                        <span className="label">Địa điểm</span>
                        <div className="value-box">{item.location}</div>
                     </div>
                  </div>
                  <div className="card-right">
                     <Button className="btn-view-list" onClick={() => handleViewStudents(item)}>
                        Danh sách sinh viên
                     </Button>
                  </div>
               </div>
            ))}
         </div>

         {/* PHẦN PAGINATION ĐÃ CẬP NHẬT */}
         {totalPages > 1 && (
            <div className="pagination">
               <span onClick={() => handlePageChange(currentPage - 1)}>&lt;</span>

               {pageNumbers.map(page => (
                  <span
                     key={page}
                     className={page === currentPage ? 'active' : ''}
                     onClick={() => handlePageChange(page)}
                  >
                     {page}
                  </span>
               ))}

               <span onClick={() => handlePageChange(currentPage + 1)}>&gt;</span>
            </div>
         )}
      </div>
   )

   // ... (renderStudentList và renderAssessModal giữ nguyên)
   const renderStudentList = () => (
      <div className="student-list-view">
         <div className="back-nav" onClick={handleBackToList}>
            <FaChevronLeft /> Quay lại lịch giảng dạy
         </div>
         {/* ... (các phần còn lại) */}
         <div className="view-header">
            <h2>Danh sách sinh viên - {selectedSession?.date}</h2>
         </div>
         <div className="session-info-panel">
            <div className="info-grid">
               <div className="info-item">
                  <span className="label">Thời gian</span>
                  <div className="value-box">{selectedSession?.time}</div>
               </div>
               <div className="info-item">
                  <span className="label">Phương thức</span>
                  <div className="value-box">{selectedSession?.method}</div>
               </div>
               <div className="info-item full-width">
                  <span className="label">Địa điểm</span>
                  <div className="value-box">{selectedSession?.location}</div>
               </div>
            </div>
         </div>
         <div className="student-table-section">
            <h3>Danh sách sinh viên tham gia</h3>
            <table className="student-table">
               <thead>
                  <tr>
                     <th>Tên sinh viên</th>
                     <th>MSSV</th>
                     <th>Email trường</th>
                     <th style={{ textAlign: 'right' }}>Trạng thái</th>
                  </tr>
               </thead>
               <tbody>
                  {students.map(student => (
                     <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.mssv}</td>
                        <td style={{ fontWeight: 'bold' }}>{student.email}</td>
                        <td style={{ textAlign: 'right' }}>
                           <button
                              className={`status-btn ${student.status}`}
                              onClick={() => handleOpenAssessModal(student)}
                           >
                              {student.status === 'pending' ? 'Chưa ghi nhận' : 'Đã ghi nhận'}
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   )

   const renderAssessModal = () => {
      if (!isModalOpen || !editingStudent) return null

      return (
         <div className="assess-modal-overlay">
            <div className="assess-modal-content">
               <div className="modal-header">
                  <h3>Ghi nhận tiến độ học tập</h3>
                  <FaTimes className="close-icon" onClick={() => setIsModalOpen(false)} />
               </div>
               <div className="modal-body">
                  <div className="student-info-row">
                     <div className="info-group">
                        <label>Họ tên</label>
                        <div className="read-only-box">{editingStudent.name}</div>
                     </div>
                  </div>
                  <div className="student-info-row split">
                     <div className="info-group">
                        <label>MSSV</label>
                        <div className="read-only-box">{editingStudent.mssv}</div>
                     </div>
                     <div className="info-group flex-grow">
                        <label>Email trường</label>
                        <div className="read-only-box">{editingStudent.email}</div>
                     </div>
                  </div>
                  <div className="form-group">
                     <label>Phần trăm hoàn thành công việc</label>
                     <input
                        type="text"
                        placeholder="Viết từ 1 - 100"
                        className="custom-input"
                        value={formData.progress}
                        onChange={e => setFormData({ ...formData, progress: e.target.value })}
                     />
                  </div>
                  <div className="form-group">
                     <label>Nhận xét</label>
                     <textarea
                        rows={4}
                        className="custom-input textarea"
                        value={formData.comment}
                        onChange={e => setFormData({ ...formData, comment: e.target.value })}
                     ></textarea>
                  </div>
               </div>
               <div className="modal-footer">
                  <Button className="btn-save" onClick={handleSaveAssessment}>
                     Tạo
                  </Button>
               </div>
            </div>
         </div>
      )
   }

   return (
      <div className="detail-component-wrapper">
         {currentView === 'list' ? renderScheduleList() : renderStudentList()}
         {renderAssessModal()}
      </div>
   )
}

export default DetailComponent
