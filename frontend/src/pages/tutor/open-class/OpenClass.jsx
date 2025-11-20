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
         </div>

         {/* Calendar Grid */}
         <div className="calendar-container">
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
}

export default OpenClass
