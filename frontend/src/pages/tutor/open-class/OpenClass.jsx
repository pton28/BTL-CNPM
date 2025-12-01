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
   addDays,
   parseISO,
   isSameDay,
} from 'date-fns'
import Button from '@/components/common/ui/button/buttonClickForm/button.jsx'
import DayDetailModal from './DayDetailModal'
import axios from '@/services/axios.customize'
import { BASE_API } from '@/constants'

const OpenClass = () => {
   const [currentDate, setCurrentDate] = useState(new Date())
   const [events, setEvents] = useState([])
   const [isLoading, setIsLoading] = useState(false)

   // --- STATE CHO MODAL MỞ MÔN ---
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [courseName, setCourseName] = useState('')
   const [sessionCount, setSessionCount] = useState(10)
   const [selectedMajor, setSelectedMajor] = useState('')
   const [method, setMethod] = useState('Offline') // <-- 1. THÊM STATE HÌNH THỨC HỌC
   const [listMajors, setListMajors] = useState([])

   const [refresh, setRefresh] = useState(false)

   // --- 1. GỌI API ---
   useEffect(() => {
      const fetchAllSlots = async () => {
         setIsLoading(true)
         try {
            const tutorId = localStorage.getItem('id')
            if (!tutorId) return

            const resMeeting = await axios.get(`${BASE_API}/meeting/tutor/${tutorId}`)
            const meetings = resMeeting.data.data || []

            let allSlots = []
            await Promise.all(
               meetings.map(async meeting => {
                  try {
                     const resSession = await axios.get(
                        `${BASE_API}/session/meeting/${meeting._id}`
                     )
                     const sessions = resSession.data.data || []

                     await Promise.all(
                        sessions.map(async session => {
                           const resSlot = await axios.get(
                              `${BASE_API}/session-slot/session/${session._id}`
                           )
                           const slots = resSlot.data.data || []

                           const formattedSlots = slots.map(slot => {
                              const isoDate = new Date(slot.date).toISOString()
                              const dateOnly = isoDate.substring(0, 10)

                              return {
                                 id: slot._id,
                                 title: session.title,
                                 date: isoDate,
                                 dateStr: dateOnly,
                                 type: 'blue',

                                 meetingTitle: meeting.title_meeting,
                                 startTime: slot.start_time,
                                 endTime: slot.end_time,
                                 location: slot.location_or_link,
                              }
                           })
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

      const fetchMajors = async () => {
         try {
            const res = await axios.get(`${BASE_API}/major`)
            if (res.data && res.data.data) {
               setListMajors(res.data.data)
               if (res.data.data.length > 0 && !selectedMajor) {
                  setSelectedMajor(res.data.data[0]._id)
               }
            }
         } catch (err) {
            console.error('Lỗi lấy danh sách Major:', err)
         }
      }

      fetchAllSlots()
      fetchMajors()
   }, [currentDate, refresh])

   // --- 2. HÀM ĐIỀU HƯỚNG ---
   const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))
   const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))

   const [selectedDate, setSelectedDate] = useState(null)
   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

   const handleDayClick = day => {
      setSelectedDate(day)
      setIsDetailModalOpen(true)
   }

   const handleSaveNewEvent = () => {
      setRefresh(prev => !prev)
      setIsDetailModalOpen(false)
   }

   // --- 3. GENERATE CALENDAR GRID ---
   const generateCalendarGrid = () => {
      const monthStart = startOfMonth(currentDate)
      const monthEnd = endOfMonth(monthStart)
      const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }) // Bắt đầu từ thứ 2
      const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 })
      const dateFormat = 'd'
      const rows = []
      let days = []
      let day = startDate
      let formattedDate = ''

      while (day <= endDate) {
         for (let i = 0; i < 7; i++) {
            formattedDate = format(day, dateFormat)
            const currentCellDateStr = format(day, 'yyyy-MM-dd')
            const dayEvents = events.filter(evt => evt.dateStr === currentCellDateStr)
            const cloneDay = day

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

   // --- 4. XỬ LÝ TẠO MÔN HỌC ---
   const handleOpenCourse = async () => {
      if (!courseName.trim()) {
         alert('Vui lòng nhập tên môn học!')
         return
      }
      if (!selectedMajor) {
         alert('Vui lòng chọn chuyên ngành!')
         return
      }
      if (sessionCount <= 0) {
         alert('Số buổi học phải lớn hơn 0!')
         return
      }

      try {
         const tutorId = localStorage.getItem('id')
         const payload = {
            title_meeting: courseName,
            tutor: tutorId,
            date_of_event: new Date().toISOString(),
            method: method, // <-- 2. GỬI HÌNH THỨC HỌC LÊN API
            session_count: Number(sessionCount),
            major: selectedMajor,
         }

         const res = await axios.post(`${BASE_API}/meeting`, payload)
         if (res.data && res.data.EC === 0) {
            alert('Đã mở môn học thành công!')
            setCourseName('')
            setSessionCount(10)
            setMethod('Offline') // Reset
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

         {/* --- MODAL MỞ MÔN --- */}
         {isModalOpen && (
            <div className="modal-overlay">
               <div className="modal-content zoom-in">
                  <div className="modal-header">
                     <h3>Mở môn học mới</h3>
                     <FaTimes className="close-icon" onClick={() => setIsModalOpen(false)} />
                  </div>

                  <div className="modal-body">
                     {/* Tên môn */}
                     <div className="form-group">
                        <label>
                           Tên môn học <span className="required">*</span>
                        </label>
                        <input
                           autoFocus
                           type="text"
                           placeholder="Ví dụ: Lập trình Web"
                           value={courseName}
                           onChange={e => setCourseName(e.target.value)}
                        />
                     </div>

                     {/* Hàng chứa: Số buổi | Hình thức | Chuyên ngành */}
                     <div className="form-row">
                        {/* Cột 1: Số buổi */}
                        <div className="form-group" style={{ flex: '0 0 20%' }}>
                           <label>Số buổi</label>
                           <input
                              type="number"
                              min="1"
                              value={sessionCount}
                              onChange={e => setSessionCount(e.target.value)}
                           />
                        </div>

                        {/* Cột 2: Hình thức học (MỚI THÊM) */}
                        <div className="form-group" style={{ flex: '0 0 30%' }}>
                           <label>Hình thức</label>
                           <select value={method} onChange={e => setMethod(e.target.value)}>
                              <option value="Offline">Offline</option>
                              <option value="Online">Online</option>
                           </select>
                        </div>

                        {/* Cột 3: Chuyên ngành */}
                        <div className="form-group" style={{ flex: '1' }}>
                           <label>
                              Chuyên ngành <span className="required">*</span>
                           </label>
                           <select
                              value={selectedMajor}
                              onChange={e => setSelectedMajor(e.target.value)}
                           >
                              <option value="" disabled>
                                 -- Chọn --
                              </option>
                              {listMajors.map(major => (
                                 <option key={major._id} value={major._id}>
                                    {major.name}
                                 </option>
                              ))}
                           </select>
                        </div>
                     </div>
                  </div>

                  <div className="modal-footer">
                     <Button onClick={handleOpenCourse}>Xác nhận</Button>
                  </div>
               </div>
            </div>
         )}

         {/* Modal Chi tiết ngày */}
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
