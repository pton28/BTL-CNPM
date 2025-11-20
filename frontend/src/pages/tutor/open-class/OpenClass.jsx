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

// --- GIẢ LẬP DỮ LIỆU API ---
// Trong thực tế, đây là response từ Backend trả về
const MOCK_API_EVENTS = [
   { id: 1, title: 'Trí tuệ nhân tạo', date: '2025-10-05', type: 'blue' },
   { id: 2, title: 'Khởi nghiệp vui vẻ', date: '2025-10-05', type: 'orange' },
   { id: 3, title: 'Cấu trúc dữ liệu', date: '2025-10-15', type: 'blue' },
   { id: 4, title: 'Thi giữa kỳ', date: '2025-11-02', type: 'pink' }, // Test tháng sau
]

const OpenClass = () => {
   // State quản lý thời gian và dữ liệu
   const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1)) // Mặc định tháng 10/2025
   const [events, setEvents] = useState([])
   const [isLoading, setIsLoading] = useState(false)

   // State Modal
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [courseName, setCourseName] = useState('')

   // 1. Gọi API khi tháng thay đổi (currentDate thay đổi)
   useEffect(() => {
      const fetchEvents = async () => {
         setIsLoading(true)
         try {
            // Giả lập delay mạng 500ms
            await new Promise(resolve => setTimeout(resolve, 500))

            // Ở đây bạn sẽ gọi axios.get(`/api/schedule?month=${...}`)
            // Tạm thời dùng mock data
            setEvents(MOCK_API_EVENTS)
         } catch (error) {
            console.error('Lỗi lấy lịch:', error)
         } finally {
            setIsLoading(false)
         }
      }

      fetchEvents()
   }, [currentDate])

   // 2. Các hàm điều hướng lịch
   const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))
   const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))

   // 3. Logic tạo lưới lịch (Grid Generation)
   const generateCalendarGrid = () => {
      const monthStart = startOfMonth(currentDate)
      const monthEnd = endOfMonth(monthStart)
      const startDate = startOfWeek(monthStart) // Ngày bắt đầu của tuần đầu tiên (có thể lấn sang tháng trước)
      const endDate = endOfWeek(monthEnd) // Ngày kết thúc của tuần cuối cùng (có thể lấn sang tháng sau)

      const dateFormat = 'd'
      const rows = []
      let days = []
      let day = startDate
      let formattedDate = ''

      while (day <= endDate) {
         for (let i = 0; i < 7; i++) {
            formattedDate = format(day, dateFormat)
            const cloneDay = day // Lưu biến để dùng trong closure map/onClick

            // Tìm các sự kiện trong ngày này
            const dayEvents = events.filter(evt => isSameDay(parseISO(evt.date), cloneDay))

            days.push(
               <div
                  className={`calendar-cell ${!isSameMonth(day, monthStart) ? 'disabled' : ''}`}
                  key={day}
               >
                  <span className="day-number">{formattedDate}</span>

                  {/* Hiển thị sự kiện */}
                  <div className="events-list">
                     {dayEvents.map(evt => (
                        <div key={evt.id} className={`event-tag ${evt.type}`}>
                           {evt.title}
                        </div>
                     ))}
                  </div>
               </div>
            )
            day = addDays(day, 1)
         }
         rows.push(
            <div className="row" key={day}>
               {days}
            </div>
         )
         days = []
      }
      return <div className="calendar-body">{rows}</div>
   }

   // Xử lý mở lớp (API POST)
   const handleOpenCourse = () => {
      if (!courseName.trim()) return

      // Gọi API tạo lớp ở đây...
      console.log('Đang tạo lớp:', courseName)

      // Reset và đóng modal
      setCourseName('')
      setIsModalOpen(false)
      alert('Đã gửi yêu cầu mở lớp!')
   }

   return (
      <div className="open-class-page">
         {/* Container chính để tạo khung boxy */}
         <div className="main-card">
            {/* Header: Điều hướng tháng + Nút mở lớp */}
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

            {/* Calendar Grid */}
            <div className="calendar-container">
               {/* Header thứ trong tuần */}
               <div className="calendar-days-header">
                  {['MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT', 'SUN'].map(d => (
                     <div key={d} className="day-name">
                        {d}
                     </div>
                  ))}
               </div>

               {/* Body: Loading hoặc Lưới lịch */}
               {isLoading ? (
                  <div className="loading-state">Đang tải lịch...</div>
               ) : (
                  generateCalendarGrid()
               )}
            </div>
         </div>

         {/* Modal (Giữ nguyên logic cũ nhưng CSS đẹp hơn) */}
         {isModalOpen && (
            <div className="modal-overlay">
               <div className="modal-content zoom-in">
                  <div className="modal-header">
                     <h3>Mở môn học mới</h3>
                     <FaTimes className="close-icon" onClick={() => setIsModalOpen(false)} />
                  </div>
                  <div className="modal-body">
                     <label>Nhập tên hoặc Mã môn học</label>
                     <input
                        autoFocus
                        type="text"
                        placeholder="Ví dụ: Cấu trúc rời rạc / CO1007"
                        value={courseName}
                        onChange={e => setCourseName(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleOpenCourse()}
                     />
                  </div>
                  <div className="modal-footer">
                     <Button onClick={handleOpenCourse}>Mở môn học</Button>
                  </div>
               </div>
            </div>
         )}
      </div>
   )
}

export default OpenClass
