import React, { useState, useEffect } from 'react'
import './detailComponent.scss'
import Button from '@/components/common/ui/button/buttonClickForm/button.jsx'
import { FaChevronLeft, FaTimes } from 'react-icons/fa'
// import axios from 'axios' // Uncomment khi đấu API

// --- 1. DỮ LIỆU GIẢ (MOCK DATA) ---
// Cấu trúc này nên giống hệt cấu trúc JSON mà Backend sẽ trả về sau này
const MOCK_SCHEDULES = [
   {
      id: 1,
      date: '31/10/2025',
      time: '07:00 - 09:00',
      method: 'Trực tiếp',
      location: 'H6 - 203 / Cơ sở 2',
      courseName: 'Chủ nghĩa Triết học Mác- Lênin',
   },
   {
      id: 2,
      date: '20/10/2025',
      time: '07:00 - 09:00',
      method: 'Trực tuyến',
      location: 'Google Meet',
      courseName: 'Chủ nghĩa Triết học Mác- Lênin',
   },
   {
      id: 3,
      date: '15/10/2025',
      time: '07:00 - 09:00',
      method: 'Trực tiếp',
      location: 'H6 - 203 / Cơ sở 2',
      courseName: 'Chủ nghĩa Triết học Mác- Lênin',
   },
]

const MOCK_STUDENTS_BY_SESSION = [
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

const DetailComponent = () => {
   // --- STATE QUẢN LÝ DỮ LIỆU ---

   // 1. Danh sách lịch giảng dạy
   // Khi có API: useState([])
   const [schedules, setSchedules] = useState(MOCK_SCHEDULES)

   // 2. Danh sách sinh viên của buổi học đang chọn
   // Khi có API: useState([])
   const [students, setStudents] = useState([])

   // State UI
   const [currentView, setCurrentView] = useState('list') // 'list' | 'students'
   const [selectedSession, setSelectedSession] = useState(null)

   // State Modal
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [editingStudent, setEditingStudent] = useState(null) // Sinh viên đang được đánh giá
   const [formData, setFormData] = useState({ progress: '', comment: '' })

   // --- PHẦN GỌI API (COMMENT LẠI) ---
   /*
    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                // const res = await axios.get('/api/tutor/schedules');
                // setSchedules(res.data);
            } catch (error) {
                console.error("Lỗi lấy lịch:", error);
            }
        }
        fetchSchedules();
    }, []);
    */

   // --- HÀM XỬ LÝ LOGIC ---

   const handleViewStudents = async session => {
      setSelectedSession(session)

      // --- MÔ PHỎNG GỌI API LẤY DANH SÁCH SINH VIÊN THEO SESSION ID ---
      /*
        try {
            // const res = await axios.get(`/api/tutor/sessions/${session.id}/students`);
            // setStudents(res.data);
        } catch (error) { ... }
        */

      // Dùng dữ liệu giả tạm thời:
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
      // Điền sẵn dữ liệu cũ nếu đã có
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

      // --- MÔ PHỎNG GỌI API LƯU ĐÁNH GIÁ ---
      /*
        try {
            await axios.post(`/api/tutor/assessment`, {
                studentId: editingStudent.id,
                sessionId: selectedSession.id,
                progress: formData.progress,
                comment: formData.comment
            });
            // Show success toast...
        } catch (error) { ... }
        */

      // Cập nhật UI ngay lập tức (Optimistic UI update)
      const updatedStudents = students.map(s =>
         s.id === editingStudent.id ? { ...s, status: 'done', ...formData } : s
      )
      setStudents(updatedStudents)

      setIsModalOpen(false)
   }

   // --- CÁC PHẦN RENDER GIAO DIỆN (GIỮ NGUYÊN NHƯ CŨ) ---

   const renderScheduleList = () => (
      <div className="schedule-list-view">
         {/* <div className="view-header">
            <h2>Lịch giảng dạy môn {schedules[0]?.courseName || '...'}</h2>
         </div> */}

         <div className="schedule-cards-container">
            {schedules.map(item => (
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
         {/* Pagination giả */}
         <div className="pagination">
            <span>&lt;</span> <span className="active">1</span> <span>2</span> <span>&gt;</span>
         </div>
      </div>
   )

   const renderStudentList = () => (
      <div className="student-list-view">
         <div className="back-nav" onClick={handleBackToList}>
            <FaChevronLeft /> Quay lại lịch giảng dạy
         </div>

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
