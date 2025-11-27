import React, { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import './detailComponent.scss'
import Button from '@/components/common/ui/button/buttonClickForm/button.jsx'
import { FaChevronLeft } from 'react-icons/fa'
import axios from '@/services/axios.customize'
import { BASE_API } from '@/constants'

const ITEMS_PER_PAGE = 5

const parseDate = dateStr => {
   if (!dateStr || dateStr === 'Chưa xếp lịch') return new Date(0)
   // Xử lý format dd/mm/yyyy
   const [day, month, year] = dateStr.split('/')
   return new Date(year, month - 1, day)
}

const DetailComponent = () => {
   const { id: meetingId } = useParams() // Lấy ID từ URL

   // --- STATE ---
   const [schedules, setSchedules] = useState([])
   const [loadingSchedules, setLoadingSchedules] = useState(true)
   const [students, setStudents] = useState([])
   const [loadingStudents, setLoadingStudents] = useState(false)

   const [currentView, setCurrentView] = useState('list') // 'list' | 'students'
   const [selectedSession, setSelectedSession] = useState(null)
   const [currentPage, setCurrentPage] = useState(1)

   // 1. CALL API LẤY SESSION VÀ SLOT
   useEffect(() => {
      const fetchSchedule = async () => {
         if (!meetingId) return
         setLoadingSchedules(true)
         try {
            // Gọi API lấy Sessions
            const resSession = await axios.get(`${BASE_API}/session/meeting/${meetingId}`)
            const sessionsData = resSession.data.data || []

            // Gọi API lấy Slot cho từng Session (Parallel)
            const promises = sessionsData.map(async session => {
               try {
                  const resSlot = await axios.get(`${BASE_API}/session-slot/session/${session._id}`)
                  const slots = resSlot.data.data || []
                  const slot = slots[0] || {}

                  return {
                     id: session._id,
                     title: session.title,
                     date: slot.date
                        ? new Date(slot.date).toLocaleDateString('en-GB')
                        : 'Chưa xếp lịch',
                     time:
                        slot.start_time && slot.end_time
                           ? `${slot.start_time} - ${slot.end_time}`
                           : '...',
                     method:
                        slot.location_or_link && slot.location_or_link.includes('http')
                           ? 'Trực tuyến'
                           : 'Trực tiếp',
                     location: slot.location_or_link || 'Chưa cập nhật',
                  }
               } catch (err) {
                  return {
                     id: session._id,
                     title: session.title,
                     date: 'Lỗi',
                     time: '...',
                     method: '...',
                     location: '...',
                  }
               }
            })

            const results = await Promise.all(promises)
            setSchedules(results)
         } catch (error) {
            console.error('Lỗi lấy lịch học:', error)
         } finally {
            setLoadingSchedules(false)
         }
      }
      fetchSchedule()
   }, [meetingId])

   // 2. CALL API LẤY SINH VIÊN KHI CLICK
   const handleViewStudents = async session => {
      setSelectedSession(session)
      setCurrentView('students')
      setLoadingStudents(true)

      try {
         const res = await axios.get(`${BASE_API}/student-with-session-slot/session/${session.id}`)
         const rawData = res.data.data || []

         const studentList = rawData.map(item => ({
            id: item.student?._id,
            name: item.student?.full_name || item.student?.name || 'Không tên',
            mssv: item.student?.mssv || '---',
            email: item.student?.email || '',
         }))
         setStudents(studentList)
      } catch (error) {
         console.error('Lỗi lấy sinh viên:', error)
         setStudents([])
      } finally {
         setLoadingStudents(false)
      }
   }

   const handleBackToList = () => {
      setSelectedSession(null)
      setStudents([])
      setCurrentView('list')
   }

   // --- LOGIC PHÂN TRANG & RENDER ---
   const sortedAndPaginatedSchedules = useMemo(() => {
      const sorted = [...schedules].sort((a, b) => parseDate(b.date) - parseDate(a.date))
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
      return sorted.slice(startIndex, startIndex + ITEMS_PER_PAGE)
   }, [schedules, currentPage])

   const totalPages = Math.ceil(schedules.length / ITEMS_PER_PAGE)
   const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

   const renderScheduleList = () => (
      <div className="schedule-list-view">
         {loadingSchedules ? (
            <p style={{ textAlign: 'center', padding: '20px' }}>Đang tải dữ liệu...</p>
         ) : schedules.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '20px' }}>
               Môn học này chưa có buổi học nào.
            </p>
         ) : (
            <>
               <div className="schedule-cards-container">
                  {sortedAndPaginatedSchedules.map(item => (
                     <div key={item.id} className="schedule-card">
                        <div className="card-left">
                           <h3 className="date-title">Ngày {item.date}</h3>
                           <div className="info-row">
                              <span className="label">Bài:</span>
                              <div className="value-box" style={{ fontWeight: 'bold' }}>
                                 {item.title}
                              </div>
                           </div>
                           <div className="info-row">
                              <span className="label">Giờ:</span>
                              <div className="value-box">{item.time}</div>
                           </div>
                           <div className="info-row">
                              <span className="label">Nơi học:</span>
                              <div className="value-box">{item.location}</div>
                           </div>
                        </div>
                        <div className="card-right">
                           <Button
                              className="btn-view-list"
                              onClick={() => handleViewStudents(item)}
                           >
                              Danh sách sinh viên
                           </Button>
                        </div>
                     </div>
                  ))}
               </div>

               {/* Pagination UI */}
               {totalPages > 1 && (
                  <div className="pagination">
                     <span onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>&lt;</span>
                     {pageNumbers.map(page => (
                        <span
                           key={page}
                           className={page === currentPage ? 'active' : ''}
                           onClick={() => setCurrentPage(page)}
                        >
                           {page}
                        </span>
                     ))}
                     <span onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}>
                        &gt;
                     </span>
                  </div>
               )}
            </>
         )}
      </div>
   )

   const renderStudentList = () => (
      <div className="student-list-view">
         <div className="back-nav" onClick={handleBackToList}>
            <FaChevronLeft /> Quay lại danh sách buổi học
         </div>
         <div className="view-header">
            <h2>Danh sách tham gia - {selectedSession?.title}</h2>
         </div>

         <div className="student-table-section">
            {loadingStudents ? (
               <p>Đang tải...</p>
            ) : (
               <table className="student-table">
                  <thead>
                     <tr>
                        <th>STT</th>
                        <th>Tên sinh viên</th>
                        <th>MSSV</th>
                        <th>Email</th>
                     </tr>
                  </thead>
                  <tbody>
                     {students.length === 0 ? (
                        <tr>
                           <td colSpan="4" style={{ textAlign: 'center' }}>
                              Chưa có sinh viên đăng ký.
                           </td>
                        </tr>
                     ) : (
                        students.map((st, i) => (
                           <tr key={st.id || i}>
                              <td>{i + 1}</td>
                              <td style={{ fontWeight: 'bold' }}>{st.name}</td>
                              <td>{st.mssv}</td>
                              <td>{st.email}</td>
                           </tr>
                        ))
                     )}
                  </tbody>
               </table>
            )}
         </div>
      </div>
   )

   return (
      <div className="detail-component-wrapper">
         {currentView === 'list' ? renderScheduleList() : renderStudentList()}
      </div>
   )
}

export default DetailComponent
