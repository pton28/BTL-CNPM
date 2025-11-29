import { useState, useEffect } from 'react'
import './OpenClass.scss'
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import {
   format,
   addMonths,
   subMonths,
   startOfMonth,
   endOfMonth,
   startOfWeek,
   endOfWeek,
   isSameMonth,
   isSameDay,
   addDays,
   parseISO,
} from 'date-fns'
import Button from '@/components/common/ui/button/buttonClickForm/button.jsx'
import DayDetailModal from './DayDetailModal'
import axios from '@/services/axios.customize' // Import axios đã config
import { BASE_API } from '@/constants'

const OpenClass = () => {
   const [currentDate, setCurrentDate] = useState(new Date())
   const [events, setEvents] = useState([])
   const [isLoading, setIsLoading] = useState(false)

   // State Modal
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [courseName, setCourseName] = useState('')

   // State Refresh để load lại dữ liệu sau khi tạo mới
   const [refresh, setRefresh] = useState(false)

   // 1. GỌI API LẤY DỮ LIỆU LỊCH (SLOTS) CỦA TUTOR
   useEffect(() => {
      const fetchAllSlots = async () => {
         setIsLoading(true)
         try {
            const tutorId = localStorage.getItem('id')
            if (!tutorId) return

            // Bước 1: Lấy danh sách Meeting của Tutor
            const resMeeting = await axios.get(`${BASE_API}/meeting/tutor/${tutorId}`)
            const meetings = resMeeting.data.data || []

            // Bước 2: Với mỗi Meeting, lấy danh sách Session -> SessionSlot
            // Lưu ý: Cách này hơi thủ công vì chưa có API "Get All Slots By Tutor".
            // Tốt nhất nên bảo Backend viết thêm API đó.
            // Dưới đây là cách xử lý tạm ở Frontend:
            let allSlots = []

            // Promise.all để chạy song song cho nhanh
            await Promise.all(
               meetings.map(async meeting => {
                  try {
                     // Lấy sessions của meeting
                     const resSession = await axios.get(
                        `${BASE_API}/session/meeting/${meeting._id}`
                     )
                     const sessions = resSession.data.data || []

                     // Với mỗi session, lấy slots
                     await Promise.all(
                        sessions.map(async session => {
                           const resSlot = await axios.get(
                              `${BASE_API}/session-slot/session/${session._id}`
                           )
                           const slots = resSlot.data.data || []

                           // Format lại dữ liệu để hiển thị lên lịch
                           const formattedSlots = slots.map(slot => ({
                              id: slot._id,
                              title: session.title, // Tên hiển thị là tên bài học hoặc tên môn
                              date: new Date(slot.date).toISOString(), // Chuẩn hóa ngày
                              type: 'blue', // Màu sắc mặc định
                           }))
                           allSlots = [...allSlots, ...formattedSlots]
                        })
                     )
                  } catch (e) {
                     console.log('Lỗi load chi tiết môn:', meeting.title_meeting)
                  }
               })
            )

            setEvents(allSlots)
         } catch (error) {
            console.error('Lỗi lấy lịch:', error)
         } finally {
            setIsLoading(false)
         }
      }

      fetchAllSlots()
   }, [currentDate, refresh]) // Chạy lại khi đổi tháng hoặc có lệnh refresh

   // 2. Các hàm điều hướng lịch
   const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))
   const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))

   const [selectedDate, setSelectedDate] = useState(null)
   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

   const handleDayClick = day => {
      setSelectedDate(day)
      setIsDetailModalOpen(true)
   }

   // Hàm callback khi tạo xong ở Modal con
   const handleSaveNewEvent = () => {
      setRefresh(prev => !prev) // Trigger useEffect chạy lại
      setIsDetailModalOpen(false)
   }

   // 3. Logic tạo lưới lịch (Grid)
   const generateCalendarGrid = () => {
      const monthStart = startOfMonth(currentDate)
      const monthEnd = endOfMonth(monthStart)
      const startDate = startOfWeek(monthStart)
      const endDate = endOfWeek(monthEnd)

      const dateFormat = 'd'
      const rows = []
      let days = []
      let day = startDate
      let formattedDate = ''

      while (day <= endDate) {
         for (let i = 0; i < 7; i++) {
            formattedDate = format(day, dateFormat)
            const cloneDay = day

            // So sánh ngày (lưu ý parseISO để tránh lệch múi giờ)
            const dayEvents = events.filter(evt => isSameDay(parseISO(evt.date), cloneDay))

            days.push(
               <div
                  className={`calendar-cell ${!isSameMonth(day, monthStart) ? 'disabled' : ''}`}
                  key={day.toString()}
                  onClick={() => handleDayClick(cloneDay)}
               >
                  <span className="day-number">{formattedDate}</span>

                  <div className="events-list">
                     {dayEvents.slice(0, 3).map((evt, idx) => (
                        <div key={idx} className={`event-tag ${evt.type || 'blue'}`}>
                           {evt.title}
                        </div>
                     ))}
                     {dayEvents.length > 3 && (
                        <span className="more-evts">+{dayEvents.length - 3}</span>
                     )}
                  </div>
               </div>
            )
            day = addDays(day, 1)
         }
         rows.push(
            <div className="row" key={day.toString()}>
               {days}
            </div>
         )
         days = []
      }
      return <div className="calendar-body">{rows}</div>
   }

   // 4. CHỨC NĂNG: MỞ MÔN HỌC (CREATE MEETING)
   const handleOpenCourse = async () => {
      if (!courseName.trim()) return

      try {
         const tutorId = localStorage.getItem('id')
         const payload = {
            title_meeting: courseName,
            tutor: tutorId,
            date_of_event: new Date().toISOString(), // Ngày tạo
            method: 'Offline', // Mặc định, có thể sửa sau
            session_count: 10, // Mặc định
            // major: "ID_MAJOR" // Nếu BE bắt buộc major, bạn cần dropdown chọn Major ở đây
         }

         const res = await axios.post(`${BASE_API}/meeting`, payload)
         if (res.data && res.data.EC === 0) {
            alert('Đã mở môn học thành công!')
            setCourseName('')
            setIsModalOpen(false)
            setRefresh(prev => !prev)
         } else {
            alert(res.data.message || 'Lỗi khi tạo môn học')
         }
      } catch (error) {
         console.error('Lỗi tạo môn:', error)
         alert('Có lỗi xảy ra!')
      }
   }

   return (
      <div className="open-class-page">
         <div className="main-card">
            <div className="card-header">
               <div className="month-navigation">
                  <button onClick={prevMonth} className="nav-btn">
                     <FaChevronLeft />
                  </button>
                  <h2>{format(currentDate, 'MMMM, yyyy')}</h2>
                  <button onClick={nextMonth} className="nav-btn">
                     <FaChevronRight />
                  </button>
               </div>
               <Button onClick={() => setIsModalOpen(true)}>Mở môn học</Button>
            </div>

            <div className="calendar-container">
               <div className="calendar-days-header">
                  {['MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT', 'SUN'].map(d => (
                     <div key={d} className="day-name">
                        {d}
                     </div>
                  ))}
               </div>
               {isLoading ? (
                  <div className="loading-state">Đang cập nhật lịch...</div>
               ) : (
                  generateCalendarGrid()
               )}
            </div>
         </div>

         {/* Modal Mở Môn Học */}
         {isModalOpen && (
            <div className="modal-overlay">
               <div className="modal-content zoom-in">
                  <div className="modal-header">
                     <h3>Mở môn học mới</h3>
                     <FaTimes className="close-icon" onClick={() => setIsModalOpen(false)} />
                  </div>
                  <div className="modal-body">
                     <label>Tên môn học</label>
                     <input
                        autoFocus
                        type="text"
                        placeholder="Ví dụ: Lập trình Web"
                        value={courseName}
                        onChange={e => setCourseName(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleOpenCourse()}
                     />
                  </div>
                  <div className="modal-footer">
                     <Button onClick={handleOpenCourse}>Xác nhận</Button>
                  </div>
               </div>
            </div>
         )}

         <DayDetailModal
            isOpen={isDetailModalOpen}
            onClose={() => setIsDetailModalOpen(false)}
            date={selectedDate || new Date()}
            events={events.filter(
               evt => selectedDate && isSameDay(parseISO(evt.date), selectedDate)
            )}
            onSave={handleSaveNewEvent}
         />
      </div>
   )
}

export default OpenClass