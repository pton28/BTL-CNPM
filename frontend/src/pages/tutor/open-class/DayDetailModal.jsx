import { useState, useEffect } from 'react'
import './DayDetailModal.scss'
import { FaTimes, FaChevronDown } from 'react-icons/fa'
import { format } from 'date-fns'
import Button from '@/components/common/ui/button/buttonClickForm/button.jsx'

const DayDetailModal = ({ isOpen, onClose, date, events, onSave }) => {
   const [activeTab, setActiveTab] = useState('list')

   const [newEvent, setNewEvent] = useState({
      courseName: '',
      day: '',
      month: '',
      year: '',
      hour: '07',
      minute: '00',
      durationHour: '2',
      durationMinute: '30',
      classSize: '20',
      mode: 'online',
      link: '',
      location: { campus: '', building: '', room: '' },
      description: '',
   })

   // Khi mở Modal hoặc đổi ngày, tự động điền ngày tháng năm của ngày đó vào form
   useEffect(() => {
      if (isOpen && date) {
         setNewEvent(prev => ({
            ...prev,
            day: format(date, 'dd'),
            month: format(date, 'MM'),
            year: format(date, 'yyyy'),
         }))
      }
   }, [isOpen, date])

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

   const handleCreate = () => {
      console.log('Dữ liệu form:', newEvent)
      onSave(newEvent)
   }

   if (!isOpen) return null

   const RenderListTab = () => (
      <div className="tab-content">
         <h2 className="modal-title">Lớp học của ngày {format(date, 'dd/MM/yyyy')}</h2>
         <div className="class-list">
            {events.length === 0 ? (
               <p className="empty-message">Chưa có lớp học nào.</p>
            ) : (
               events.map((evt, index) => (
                  <div key={index} className="class-card-item">
                     <h4 className="class-name">{evt.title}</h4>
                     <div className="class-meta">
                        <div className="meta-item">
                           Phòng học <span className="badge">{evt.room || 'Online'}</span>
                        </div>
                        <div className="meta-item">
                           Thời gian học{' '}
                           <span className="badge">{evt.time || '07:00 - 09:00'}</span>
                        </div>
                     </div>
                  </div>
               ))
            )}
         </div>
      </div>
   )

   // --- TAB 2: TẠO MỚI (CHỈNH SỬA INPUT) ---
   const RenderCreateTab = () => (
      <div className="tab-content">
         <h2 className="modal-title">Sự kiện mới</h2>

         <div className="form-layout">
            <div className="form-group">
               <label>Chọn môn học hoặc Mã môn học</label>
               <input
                  name="courseName"
                  value={newEvent.courseName}
                  onChange={handleInputChange}
                  className="custom-input"
                  placeholder="Nhập tên môn..."
               />
            </div>

            <div className="form-group">
               <label>Ngày / Tháng / Năm - Giờ / Phút</label>
               <div className="row-inputs">
                  {/* Thay div bằng input type="number" */}
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
               <div className="form-group half">
                  <label>Sĩ số</label>
                  <div className="row-inputs">
                     <div className="input-wrapper medium">
                        <input
                           type="number"
                           name="classSize"
                           value={newEvent.classSize}
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
                        placeholder="Link học online"
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
                           placeholder="Lớp"
                           className="custom-input"
                           onChange={handleLocationChange}
                        />
                     </div>
                  )}
               </div>
            </div>

            {/* Mô tả */}
            <div className="form-group">
               <label>Mô tả</label>
               <textarea
                  name="description"
                  value={newEvent.description}
                  onChange={handleInputChange}
                  className="custom-input textarea"
                  rows={3}
               />
            </div>
         </div>

         <div className="modal-footer">
            <button className="btn-white-submit" onClick={handleCreate}>
               Tạo
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
                  Danh sách
               </button>
               <button
                  className={activeTab === 'create' ? 'active' : ''}
                  onClick={() => setActiveTab('create')}
               >
                  Tạo mới
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
