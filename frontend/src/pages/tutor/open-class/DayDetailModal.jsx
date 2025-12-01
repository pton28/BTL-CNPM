import { useState, useEffect } from 'react'
import './DayDetailModal.scss'
import { FaTimes } from 'react-icons/fa'
import { format } from 'date-fns'
import axios from '@/services/axios.customize'
import { BASE_API } from '@/constants'

const DayDetailModal = ({ isOpen, onClose, date, events, onSave }) => {
   const [activeTab, setActiveTab] = useState('list')
   const [loading, setLoading] = useState(false)
   const [myMeetings, setMyMeetings] = useState([])

   // --- STATE MỚI ---
   const [sessionsOfMeeting, setSessionsOfMeeting] = useState([]) // Danh sách session của môn đã chọn
   const [inputType, setInputType] = useState('new') // 'new' | 'existing'

   const [newEvent, setNewEvent] = useState({
      meetingId: '',
      sessionTitle: '', // Dùng khi nhập mới
      sessionId: '', // Dùng khi chọn có sẵn
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
   })

   // 1. Reset form
   useEffect(() => {
      if (isOpen && date) {
         setNewEvent(prev => ({
            ...prev,
            day: format(date, 'dd'),
            month: format(date, 'MM'),
            year: format(date, 'yyyy'),
            meetingId: '',
            sessionTitle: '',
            sessionId: '',
            mode: 'online',
            link: '',
            location: { campus: '', building: '', room: '' },
         }))
         setInputType('new')
         setSessionsOfMeeting([])
         fetchMyMeetings()
         setActiveTab('list')
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

   // --- LOGIC MỚI: KHI CHỌN MÔN HỌC -> LẤY SESSION ---
   const handleMeetingChange = async e => {
      const meetingId = e.target.value
      setNewEvent(prev => ({ ...prev, meetingId, sessionId: '' })) // Reset session khi đổi môn
      setSessionsOfMeeting([])

      if (meetingId) {
         try {
            const res = await axios.get(`${BASE_API}/session/meeting/${meetingId}`)
            if (res.data && res.data.data) {
               setSessionsOfMeeting(res.data.data)
            }
         } catch (error) {
            console.log('Lỗi lấy session:', error)
         }
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

   const handleCreate = async () => {
      if (!newEvent.meetingId) {
         alert('Vui lòng chọn môn học!')
         return
      }

      // Validate theo loại nhập liệu
      if (inputType === 'new' && !newEvent.sessionTitle.trim()) {
         alert('Vui lòng nhập nội dung buổi học!')
         return
      }
      if (inputType === 'existing' && !newEvent.sessionId) {
         alert('Vui lòng chọn buổi học có sẵn!')
         return
      }

      setLoading(true)
      try {
         let finalSessionId = newEvent.sessionId

         // Bước 1: Nếu là session mới -> Gọi API tạo Session
         if (inputType === 'new') {
            const sessionPayload = {
               title: newEvent.sessionTitle,
               meeting: newEvent.meetingId,
            }
            const sessionRes = await axios.post(`${BASE_API}/session`, sessionPayload)
            const createdSession = sessionRes.data.data
            if (!createdSession || !createdSession._id) throw new Error('Lỗi tạo Session')
            finalSessionId = createdSession._id
         }

         // Bước 2: Tính toán thời gian (Giữ nguyên logic cũ)
         const startTimeStr = `${newEvent.hour.toString().padStart(2, '0')}:${newEvent.minute.toString().padStart(2, '0')}`
         let startH = parseInt(newEvent.hour)
         let startM = parseInt(newEvent.minute)
         let durH = parseInt(newEvent.durationHour || 0)
         let durM = parseInt(newEvent.durationMinute || 0)
         let totalStartMinutes = startH * 60 + startM
         let totalDuration = durH * 60 + durM
         let totalEndMinutes = totalStartMinutes + totalDuration
         let endH = Math.floor(totalEndMinutes / 60) % 24
         let endM = totalEndMinutes % 60
         const endTimeStr = `${endH.toString().padStart(2, '0')}:${endM.toString().padStart(2, '0')}`
         const isoDate = `${newEvent.year}-${newEvent.month.toString().padStart(2, '0')}-${newEvent.day.toString().padStart(2, '0')}`

         let locString = ''
         if (newEvent.mode === 'online') {
            locString = newEvent.link || 'Online Meeting'
         } else {
            const { room, building, campus } = newEvent.location
            const parts = []
            if (room) parts.push(room)
            if (building) parts.push(building)
            if (campus) parts.push(campus)
            locString = parts.length > 0 ? parts.join(' - ') : 'Offline'
         }

         // Bước 3: Tạo Slot (Lịch)
         const slotPayload = {
            session: finalSessionId, // Dùng ID đã có hoặc mới tạo
            start_time: startTimeStr,
            end_time: endTimeStr,
            location_or_link: locString,
            date: isoDate,
            duration: totalDuration,
         }

         const slotRes = await axios.post(`${BASE_API}/session-slot`, slotPayload)
         if (slotRes.data) {
            alert('Đã tạo lịch học thành công!')
            onSave()
         }
      } catch (error) {
         console.error('Lỗi tạo lịch:', error)
         alert('Có lỗi xảy ra khi tạo lịch!')
      } finally {
         setLoading(false)
      }
   }

   if (!isOpen) return null

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
               {/* TAB 1: DANH SÁCH (Giữ nguyên) */}
               {activeTab === 'list' && (
                  <div className="tab-content">
                     <h2 className="modal-title">Lớp học ngày {format(date, 'dd/MM/yyyy')}</h2>
                     <div className="class-list">
                        {events.length === 0 ? (
                           <p className="empty-message">Không có lịch dạy nào trong ngày này.</p>
                        ) : (
                           events.map((evt, index) => {
                              const isLink =
                                 evt.location &&
                                 (evt.location.startsWith('http') || evt.location.startsWith('www'))
                              return (
                                 <div key={index} className="class-card-item">
                                    <h4 className="class-subject">
                                       {evt.meetingTitle || 'Môn học'}
                                    </h4>
                                    <div className="class-session">
                                       <span className="label">Nội dung:</span> {evt.title}
                                    </div>
                                    <div className="class-meta-row">
                                       <div className="meta-item time">
                                          🕒 {evt.startTime} - {evt.endTime}
                                       </div>
                                       <div className="meta-item location">
                                          {isLink ? (
                                             <a
                                                href={evt.location}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="link-btn"
                                             >
                                                Vào lớp ngay
                                             </a>
                                          ) : (
                                             <span>📍 {evt.location}</span>
                                          )}
                                       </div>
                                    </div>
                                 </div>
                              )
                           })
                        )}
                     </div>
                  </div>
               )}

               {/* TAB 2: TẠO MỚI (ĐÃ CẬP NHẬT) */}
               {activeTab === 'create' && (
                  <div className="tab-content">
                     <h2 className="modal-title">Lên lịch dạy mới</h2>

                     <div className="form-layout">
                        {/* 1. Chọn môn học */}
                        <div className="form-group">
                           <label>
                              Chọn môn học <span style={{ color: 'red' }}>*</span>
                           </label>
                           <select
                              className="custom-input"
                              name="meetingId"
                              value={newEvent.meetingId}
                              onChange={handleMeetingChange}
                           >
                              <option value="">-- Chọn môn học --</option>
                              {myMeetings.map(m => (
                                 <option key={m._id} value={m._id}>
                                    {m.title_meeting}
                                 </option>
                              ))}
                           </select>
                        </div>

                        {/* 2. Nội dung buổi học (CẬP NHẬT UI MỚI) */}
                        <div className="form-group">
                           <label>
                              Nội dung buổi học <span style={{ color: 'red' }}>*</span>
                           </label>

                           {/* Radio Group để chọn chế độ */}
                           <div
                              className="radio-group"
                              style={{ marginBottom: '10px', display: 'flex', gap: '20px' }}
                           >
                              <div className="radio-item">
                                 <input
                                    type="radio"
                                    id="typeNew"
                                    name="inputType"
                                    checked={inputType === 'new'}
                                    onChange={() => setInputType('new')}
                                    style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                                 />
                                 <label
                                    htmlFor="typeNew"
                                    style={{
                                       marginLeft: '8px',
                                       cursor: 'pointer',
                                       fontWeight: 'normal',
                                    }}
                                 >
                                    Tạo nội dung mới
                                 </label>
                              </div>

                              <div className="radio-item">
                                 <input
                                    type="radio"
                                    id="typeExisting"
                                    name="inputType"
                                    checked={inputType === 'existing'}
                                    onChange={() => setInputType('existing')}
                                    disabled={!newEvent.meetingId} // Disable nếu chưa chọn môn
                                    style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                                 />
                                 <label
                                    htmlFor="typeExisting"
                                    style={{
                                       marginLeft: '8px',
                                       cursor: 'pointer',
                                       fontWeight: 'normal',
                                       opacity: !newEvent.meetingId ? 0.5 : 1,
                                    }}
                                 >
                                    Chọn bài có sẵn
                                 </label>
                              </div>
                           </div>

                           {/* Hiển thị Input hoặc Select tùy theo chế độ */}
                           {inputType === 'new' ? (
                              <input
                                 name="sessionTitle"
                                 value={newEvent.sessionTitle}
                                 onChange={handleInputChange}
                                 className="custom-input"
                                 placeholder="VD: Chương 1 - Giới thiệu..."
                                 autoComplete="off"
                              />
                           ) : (
                              <select
                                 className="custom-input"
                                 name="sessionId"
                                 value={newEvent.sessionId}
                                 onChange={handleInputChange}
                                 disabled={sessionsOfMeeting.length === 0}
                              >
                                 <option value="">-- Chọn bài học có sẵn --</option>
                                 {sessionsOfMeeting.length > 0 ? (
                                    sessionsOfMeeting.map(s => (
                                       <option key={s._id} value={s._id}>
                                          {s.title}
                                       </option>
                                    ))
                                 ) : (
                                    <option disabled>Môn này chưa có bài học nào</option>
                                 )}
                              </select>
                           )}
                        </div>

                        {/* 3. Thời gian bắt đầu */}
                        <div className="form-group">
                           <label>Thời gian bắt đầu</label>
                           <div className="row-inputs">
                              <div className="input-wrapper small">
                                 <input
                                    type="number"
                                    name="day"
                                    value={newEvent.day}
                                    onChange={handleInputChange}
                                 />
                              </div>
                              <span className="divider">/</span>
                              <div className="input-wrapper small">
                                 <input
                                    type="number"
                                    name="month"
                                    value={newEvent.month}
                                    onChange={handleInputChange}
                                 />
                              </div>
                              <span className="divider">/</span>
                              <div className="input-wrapper medium">
                                 <input
                                    type="number"
                                    name="year"
                                    value={newEvent.year}
                                    onChange={handleInputChange}
                                 />
                              </div>

                              <span className="spacer" style={{ margin: '0 10px' }}>
                                 |
                              </span>

                              <div className="input-wrapper small">
                                 <input
                                    type="number"
                                    name="hour"
                                    value={newEvent.hour}
                                    onChange={handleInputChange}
                                 />
                              </div>
                              <span className="divider">:</span>
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

                        {/* 4. Thời lượng */}
                        <div className="form-group">
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
                              <span className="divider">:</span>
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

                        {/* 5. Hình thức & Địa điểm */}
                        <div className="form-group">
                           <label>Hình thức</label>
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
                                    placeholder="Dán link Google Meet / Zoom vào đây"
                                    autoComplete="off"
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
                                       name="room"
                                       placeholder="Phòng (VD: 402)"
                                       className="custom-input"
                                       value={newEvent.location.room}
                                       onChange={handleLocationChange}
                                    />
                                    <input
                                       name="building"
                                       placeholder="Tòa (VD: H6)"
                                       className="custom-input"
                                       value={newEvent.location.building}
                                       onChange={handleLocationChange}
                                    />
                                    <input
                                       name="campus"
                                       placeholder="Cơ sở (VD: CS2)"
                                       className="custom-input"
                                       value={newEvent.location.campus}
                                       onChange={handleLocationChange}
                                    />
                                 </div>
                              )}
                           </div>
                        </div>
                     </div>

                     <div className="modal-footer">
                        <button
                           className="btn-white-submit"
                           onClick={handleCreate}
                           disabled={loading}
                        >
                           {loading ? 'Đang tạo...' : 'Tạo lịch'}
                        </button>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   )
}

export default DayDetailModal
