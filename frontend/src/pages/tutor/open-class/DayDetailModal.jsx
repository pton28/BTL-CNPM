import { useState, useEffect } from 'react'
import './DayDetailModal.scss'
import { FaTimes } from 'react-icons/fa'
import { format } from 'date-fns'
import axios from '@/services/axios.customize'
import { BASE_API } from '@/constants'

const DayDetailModal = ({ isOpen, onClose, date, events, onSave }) => {
   const [activeTab, setActiveTab] = useState('list')
   const [loading, setLoading] = useState(false)

   // Danh sách môn học của Tutor (để chọn khi tạo lịch)
   const [myMeetings, setMyMeetings] = useState([])

   const [newEvent, setNewEvent] = useState({
      meetingId: '', // ID của môn học (Quan trọng)
      sessionTitle: '', // Tên bài học (VD: Chương 1)

      // Thời gian
      day: '',
      month: '',
      year: '',
      hour: '07',
      minute: '00',
      durationHour: '2',
      durationMinute: '00',

      mode: 'online',
      link: '',
      location: { campus: '', building: '', room: '' },
      description: '',
   })

   // 1. Khi mở Modal: Reset form & Load danh sách môn học
   useEffect(() => {
      if (isOpen && date) {
         setNewEvent(prev => ({
            ...prev,
            day: format(date, 'dd'),
            month: format(date, 'MM'),
            year: format(date, 'yyyy'),
            meetingId: '',
            sessionTitle: '',
         }))

         fetchMyMeetings()
      }
   }, [isOpen, date])

   const fetchMyMeetings = async () => {
      try {
         const tutorId = localStorage.getItem('id')
         if (!tutorId) return

         const res = await axios.get(`${BASE_API}/meeting/tutor/${tutorId}`)
         if (res.data && res.data.data) {
            setMyMeetings(res.data.data)
         }
      } catch (error) {
         console.log('Lỗi lấy danh sách môn:', error)
      }
   }

   const handleInputChange = e => {
      const { name, value } = e.target
      setNewEvent(prev => ({ ...prev, [name]: value }))
   }

   const handleLocationChange = e => {
      const { name, value } = e.target
      setNewEvent(prev => ({
         ...prev,
         location: { ...prev.location, [name]: value },
      }))
   }

   // 2. CHỨC NĂNG: TẠO SESSION VÀ SLOT
   const handleCreate = async () => {
      // Validate
      if (!newEvent.meetingId) {
         alert('Vui lòng chọn môn học!')
         return
      }
      if (!newEvent.sessionTitle) {
         alert('Vui lòng nhập nội dung buổi học!')
         return
      }

      setLoading(true)
      try {
         // BƯỚC 1: TẠO SESSION (Bài học)
         // POST /session
         const sessionPayload = {
            title: newEvent.sessionTitle,
            meeting: newEvent.meetingId,
         }
         const sessionRes = await axios.post(`${BASE_API}/session`, sessionPayload)
         const createdSession = sessionRes.data.data

         if (!createdSession || !createdSession._id) {
            throw new Error('Không thể tạo Session')
         }

         // BƯỚC 2: TÍNH TOÁN THỜI GIAN
         // Format Start Time: "07:00"
         const startTimeStr = `${newEvent.hour.padStart(2, '0')}:${newEvent.minute.padStart(2, '0')}`

         // Tính End Time
         let startH = parseInt(newEvent.hour)
         let startM = parseInt(newEvent.minute)
         let durH = parseInt(newEvent.durationHour || 0)
         let durM = parseInt(newEvent.durationMinute || 0)

         let endM = startM + durM
         let endH = startH + durH + Math.floor(endM / 60)
         endM = endM % 60

         const endTimeStr = `${endH.toString().padStart(2, '0')}:${endM.toString().padStart(2, '0')}`

         // Format Date ISO (yyyy-mm-dd)
         const isoDate = `${newEvent.year}-${newEvent.month.padStart(2, '0')}-${newEvent.day.padStart(2, '0')}`

         // Location string
         const locString =
            newEvent.mode === 'online'
               ? newEvent.link || 'Online'
               : `${newEvent.location.room} - ${newEvent.location.building} (${newEvent.location.campus})`

         // BƯỚC 3: TẠO SLOT (Lịch)
         // POST /session-slot
         const slotPayload = {
            session: createdSession._id,
            start_time: startTimeStr,
            end_time: endTimeStr,
            location_or_link: locString,
            date: isoDate, // Backend cần check xem nhận Date object hay string
            duration: durH * 60 + durM, // Tổng phút
         }

         const slotRes = await axios.post(`${BASE_API}/session-slot`, slotPayload)

         if (slotRes.data) {
            alert('Đã tạo lịch học thành công!')
            onSave() // Refresh lại lịch ở trang cha
         }
      } catch (error) {
         console.error('Lỗi tạo lịch:', error)
         alert('Có lỗi xảy ra khi tạo lịch!')
      } finally {
         setLoading(false)
      }
   }

   if (!isOpen) return null

   const RenderListTab = () => (
      <div className="tab-content">
         <h2 className="modal-title">Lớp học ngày {format(date, 'dd/MM/yyyy')}</h2>
         <div className="class-list">
            {events.length === 0 ? (
               <p className="empty-message">Không có lịch dạy nào trong ngày này.</p>
            ) : (
               events.map((evt, index) => (
                  <div key={index} className="class-card-item">
                     <h4 className="class-name">{evt.title}</h4>
                     {/* Có thể thêm giờ học nếu API trả về chi tiết */}
                  </div>
               ))
            )}
         </div>
      </div>
   )

   const RenderCreateTab = () => (
      <div className="tab-content">
         <h2 className="modal-title">Lên lịch dạy mới</h2>

         <div className="form-layout">
            {/* 1. CHỌN MÔN HỌC (QUAN TRỌNG) */}
            <div className="form-group">
               <label>
                  Chọn môn học <span style={{ color: 'red' }}>*</span>
               </label>
               <select
                  className="custom-input"
                  name="meetingId"
                  value={newEvent.meetingId}
                  onChange={handleInputChange}
               >
                  <option value="">-- Chọn môn học --</option>
                  {myMeetings.map(m => (
                     <option key={m._id} value={m._id}>
                        {m.title_meeting}
                     </option>
                  ))}
               </select>
            </div>

            {/* 2. NHẬP NỘI DUNG BUỔI HỌC */}
            <div className="form-group">
               <label>
                  Nội dung buổi học (Tiêu đề Session) <span style={{ color: 'red' }}>*</span>
               </label>
               <input
                  name="sessionTitle"
                  value={newEvent.sessionTitle}
                  onChange={handleInputChange}
                  className="custom-input"
                  placeholder="VD: Chương 1 - Giới thiệu, Bài tập lớn..."
               />
            </div>

            <div className="form-group">
               <label>Ngày / Tháng / Năm - Giờ bắt đầu</label>
               <div className="row-inputs">
                  <div className="input-wrapper small">
                     <input
                        type="number"
                        name="day"
                        value={newEvent.day}
                        onChange={handleInputChange}
                     />
                  </div>
                  <div className="input-wrapper small">
                     <input
                        type="number"
                        name="month"
                        value={newEvent.month}
                        onChange={handleInputChange}
                     />
                  </div>
                  <div className="input-wrapper medium">
                     <input
                        type="number"
                        name="year"
                        value={newEvent.year}
                        onChange={handleInputChange}
                     />
                  </div>
                  <span className="divider">-</span>
                  <div className="input-wrapper small">
                     <input
                        type="number"
                        name="hour"
                        value={newEvent.hour}
                        onChange={handleInputChange}
                     />
                  </div>
                  <div className="input-wrapper small">
                     <input
                        type="number"
                        name="minute"
                        value={newEvent.minute}
                        onChange={handleInputChange}
                     />
                  </div>
               </div>
            </div>

            <div className="form-row-split">
               <div className="form-group half">
                  <label>Thời lượng (Giờ : Phút)</label>
                  <div className="row-inputs">
                     <div className="input-wrapper small">
                        <input
                           type="number"
                           name="durationHour"
                           value={newEvent.durationHour}
                           onChange={handleInputChange}
                        />
                     </div>
                     <div className="input-wrapper small">
                        <input
                           type="number"
                           name="durationMinute"
                           value={newEvent.durationMinute}
                           onChange={handleInputChange}
                        />
                     </div>
                  </div>
               </div>
            </div>

            <div className="form-group">
               <label>Hình thức học</label>
               <div className="radio-group">
                  <div className="radio-item">
                     <input
                        type="radio"
                        id="online"
                        name="mode"
                        value="online"
                        checked={newEvent.mode === 'online'}
                        onChange={handleInputChange}
                     />
                     <label htmlFor="online">Online</label>
                  </div>
                  {newEvent.mode === 'online' && (
                     <input
                        name="link"
                        value={newEvent.link}
                        onChange={handleInputChange}
                        className="custom-input link-input"
                        placeholder="Link Google Meet / Zoom"
                     />
                  )}

                  <div className="radio-item mt-2">
                     <input
                        type="radio"
                        id="offline"
                        name="mode"
                        value="offline"
                        checked={newEvent.mode === 'offline'}
                        onChange={handleInputChange}
                     />
                     <label htmlFor="offline">Offline</label>
                  </div>
                  {newEvent.mode === 'offline' && (
                     <div className="row-inputs location-inputs">
                        <input
                           name="campus"
                           placeholder="Cơ sở"
                           className="custom-input"
                           onChange={handleLocationChange}
                        />
                        <input
                           name="building"
                           placeholder="Tòa"
                           className="custom-input"
                           onChange={handleLocationChange}
                        />
                        <input
                           name="room"
                           placeholder="Phòng"
                           className="custom-input"
                           onChange={handleLocationChange}
                        />
                     </div>
                  )}
               </div>
            </div>
         </div>

         <div className="modal-footer">
            <button className="btn-white-submit" onClick={handleCreate} disabled={loading}>
               {loading ? 'Đang tạo...' : 'Tạo lịch'}
            </button>
         </div>
      </div>
   )

   return (
      <div className="modal-backdrop" onClick={onClose}>
         <div className="modal-container" onClick={e => e.stopPropagation()}>
            <FaTimes className="close-icon" onClick={onClose} />
            <div className="tab-nav">
               <button
                  className={activeTab === 'list' ? 'active' : ''}
                  onClick={() => setActiveTab('list')}
               >
                  Danh sách lớp
               </button>
               <button
                  className={activeTab === 'create' ? 'active' : ''}
                  onClick={() => setActiveTab('create')}
               >
                  Tạo lịch mới
               </button>
            </div>
            <div className="modal-body">
               {activeTab === 'list' ? <RenderListTab /> : <RenderCreateTab />}
            </div>
         </div>
      </div>
   )
}

export default DayDetailModal
