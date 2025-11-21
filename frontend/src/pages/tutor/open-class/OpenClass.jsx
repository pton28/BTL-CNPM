<<<<<<< HEAD
import { useState } from 'react'
import './OpenClass.scss'
import { FaTimes } from 'react-icons/fa' // Cần cài: npm install react-icons

const OpenClass = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [courseName, setCourseName] = useState('')

    // Dữ liệu giả lập cho lịch (Tháng 10/2025)
    // Bạn có thể thay thế logic này bằng thư viện như 'date-fns' hoặc 'moment' sau này
    const calendarDays = [
        { day: 29, prevMonth: true, events: [{ title: 'Trí tuệ nhân tạo cho ...', type: 'blue' }] },
        { day: 30, prevMonth: true, events: [] },
        { day: 1, events: [] },
        { day: 2, events: [] },
        { day: 3, events: [] },
        { day: 4, events: [] },
        {
            day: 5,
            events: [
                { title: 'Trí tuệ nhân tạo cho ...', type: 'blue' },
                { title: 'Khởi nghiệp vui vẻ', type: 'orange' },
            ],
        },
        { day: 6, events: [] },
        { day: 7, events: [] },
        { day: 8, events: [] },
        { day: 9, events: [{ title: 'Trí tuệ nhân tạo cho ...', type: 'blue' }] },
        { day: 10, events: [] },
        { day: 11, events: [{ title: 'Trí tuệ nhân tạo cho ...', type: 'blue' }] },
        { day: 12, events: [] },
        { day: 13, events: [{ title: 'Trí tuệ nhân tạo cho ...', type: 'blue' }] },
        { day: 14, events: [] },
        { day: 15, events: [] },
        { day: 16, events: [] },
        { day: 17, events: [{ title: 'Trí tuệ nhân tạo cho ...', type: 'blue' }] },
        { day: 18, events: [] },
        {
            day: 19,
            events: [
                { title: 'Quotes', type: 'blue' },
                { title: 'Khởi nghiệp vui vẻ', type: 'orange' },
                { title: 'Học, học nữa, học ...', type: 'pink' },
            ],
        },
        { day: 20, events: [] },
        { day: 21, events: [] },
        { day: 22, events: [] },
        { day: 23, events: [{ title: 'Trí tuệ nhân tạo cho ...', type: 'blue' }] },
        { day: 24, events: [] },
        {
            day: 25,
            events: [
                { title: 'Trí tuệ nhân tạo cho ...', type: 'blue' },
                { title: 'Khởi nghiệp vui vẻ', type: 'orange' },
                { title: 'Học, học nữa, học ...', type: 'pink' },
            ],
        },
        { day: 26, events: [] },
        {
            day: 27,
            events: [
                { title: 'Trí tuệ nhân tạo cho ...', type: 'blue' },
                { title: 'Khởi nghiệp vui vẻ', type: 'orange' },
                { title: 'Học, học nữa, học ...', type: 'pink' },
            ],
        },
        { day: 28, events: [] },
        { day: 29, events: [] },
        { day: 30, events: [] },
        { day: 31, events: [{ title: 'Trí tuệ nhân tạo cho ...', type: 'blue' }] },
        { day: 1, nextMonth: true, events: [] }, // Giả lập ngày đầu tháng sau
    ]

    const handleOpenCourse = () => {
        console.log('Mở môn học:', courseName)
        // Gọi API ở đây
        setIsModalOpen(false)
        setCourseName('')
    }

    return (
        <div className="open-class-page">
            {/* Header Action */}
            <div className="page-header">
                <h2>Oct, 2025</h2>
                <button className="btn-primary-blue" onClick={() => setIsModalOpen(true)}>
                    Mở môn học
                </button>
=======
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

   const [selectedDate, setSelectedDate] = useState(null)
   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

   // Hàm xử lý khi click vào ô lịch
   const handleDayClick = day => {
      setSelectedDate(day)
      setIsDetailModalOpen(true)
   }

   // Hàm lưu sự kiện mới (Giả lập)
   const handleSaveNewEvent = () => {
      alert('Đã tạo sự kiện thành công!')
      setIsDetailModalOpen(false)
   }

   // 3. Logic tạo lưới lịch (Grid Generation)
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

            const dayEvents = events.filter(evt => isSameDay(parseISO(evt.date), cloneDay))

            days.push(
               <div
                  className={`calendar-cell ${!isSameMonth(day, monthStart) ? 'disabled' : ''}`}
                  key={day}
                  onClick={() => handleDayClick(cloneDay)}
               >
                  <span className="day-number">{formattedDate}</span>

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
>>>>>>> trinh
            </div>

            {/* Calendar Grid */}
            <div className="calendar-container">
<<<<<<< HEAD
                {/* Days Header */}
                <div className="calendar-header">
                    {['MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT', 'SUN'].map(d => (
                        <div key={d} className="day-name">
                            {d}
                        </div>
                    ))}
                </div>

                {/* Days Body */}
                <div className="calendar-body">
                    {calendarDays.map((item, index) => (
                        <div
                            key={index}
                            className={`calendar-cell ${item.prevMonth || item.nextMonth ? 'faded' : ''}`}
                        >
                            <span className="day-number">{item.day}</span>
                            <div className="events-list">
                                {item.events.map((event, idx) => (
                                    <div key={idx} className={`event-tag ${event.type}`}>
                                        {event.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Mở môn học */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Mở môn học mới</h3>
                            <FaTimes className="close-icon" onClick={() => setIsModalOpen(false)} />
                        </div>

                        <div className="modal-body">
                            <label>Nhập tên hoặc Mã môn học</label>
                            <input
                                type="text"
                                placeholder="Ví dụ: Cấu trúc rời rạc / CO1007"
                                value={courseName}
                                onChange={e => setCourseName(e.target.value)}
                            />
                        </div>

                        <div className="modal-footer">
                            <button className="btn-submit" onClick={handleOpenCourse}>
                                Mở môn học
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
=======
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
         <DayDetailModal
            isOpen={isDetailModalOpen}
            onClose={() => setIsDetailModalOpen(false)}
            date={selectedDate || new Date()}
            events={events.filter(evt => isSameDay(parseISO(evt.date), selectedDate))}
            onSave={handleSaveNewEvent}
         />
      </div>
   )
>>>>>>> trinh
}

export default OpenClass
