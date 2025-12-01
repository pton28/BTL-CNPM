import { useState, useEffect } from 'react'
import './SearchCourse.scss'
import { useFetchAllMeeting } from '@/services/fetchAPI/useFetchAllMeeting'
import axios from '@/services/axios.customize'
import { BASE_API } from '@/constants'
import { useFetchAllTutor } from '@/services/fetchAPI/useFetchAllTutor'
import { useFetchAllMajor } from '@/services/fetchAPI/useFetchAllMajor'
import { message } from 'antd'

/**
 * @author: ChatGPT 80% - Vu 20%
 * @date: 25/11/2025
 */
const SearchCourse = () => {
   const [refresh, setRefresh] = useState(true)
   const { data: courses, loading } = useFetchAllMeeting(refresh)

   const [refreshTutor, setRefreshTutor] = useState(true)
   const { tutors, loading: loadingTutor } = useFetchAllTutor(refreshTutor)

   const [refreshMajor, setRefreshMajor] = useState(true)
   const { majors, loading: loadingMajor } = useFetchAllMajor(refreshMajor)

   const [filterObj, setFilterObj] = useState({ major: '', tutor: '' })
   const [filteredCourses, setFilteredCourses] = useState([])
   const [searchText, setSearchText] = useState('')

   // Hàm loại bỏ dấu tiếng Việt
   const removeVietnameseTones = str => {
      if (!str) return ''
      str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      str = str.replace(/đ/g, 'd').replace(/Đ/g, 'D')
      return str
   }

   useEffect(() => {
      if (!courses) return

      let result = [...courses]

      // Lọc theo giảng viên
      if (filterObj.tutor) {
         result = result.filter(course =>
            course.lecturer?.toLowerCase().includes(filterObj.tutor.toLowerCase())
         )
      }

      // Lọc theo lĩnh vực
      if (filterObj.major) {
         result = result.filter(course =>
            course.department?.toLowerCase().includes(filterObj.major.toLowerCase())
         )
      }

      // Tìm kiếm theo tên khóa học (không dấu, không phân biệt hoa thường)
      if (searchText) {
         const searchTextNormalized = removeVietnameseTones(searchText.toLowerCase())

         result = result.filter(course => {
            const subjectNormalized = removeVietnameseTones(course.subject?.toLowerCase() || '')
            const lecturerNormalized = removeVietnameseTones(course.lecturer?.toLowerCase() || '')

            return (
               subjectNormalized.includes(searchTextNormalized) ||
               lecturerNormalized.includes(searchTextNormalized)
            )
         })
      }

      setFilteredCourses(result)
   }, [filterObj, courses, searchText])

   const handleSignUpMeeting = async meetingId => {
      const studentId = localStorage.getItem('id')

      try {
         const obj = {
            student_id: studentId,
            meeting_id: meetingId,
         }
         const resp = await axios.post(`${BASE_API}/student-with-meeting`, obj)
         if (resp.status === 201) setRefresh(prev => !prev)
      } catch (error) {
         console.log('Error at Search Course: sign up meeting by student', error)
      }
   }

   const handleResetFilter = () => {
      setFilterObj({ major: '', tutor: '' })
      setSearchText('')
   }

   const handleFilterChange = (field, value) => {
      setFilterObj(prev => ({ ...prev, [field]: value }))
   }

   // Hàm kiểm tra ngày có phải tương lai không
   const isPast = dateString => {
      if (!dateString) return false
      const eventDate = new Date(dateString)
      const today = new Date('1/12/2025')
      // today.setHours(0, 0, 0, 0) // Reset giờ về 00:00:00 để so sánh chính xác
      // console.log('date', dateString, '-> result', Boolean(eventDate > today))

      return eventDate > today
   }
   const handleCancelMeeting = async (meeting_id) => {
      // TODO: Thực hiện logic hủy đăng ký ở đây
      console.log('Hủy đăng ký meeting:', meeting_id)
      const student_id = localStorage.getItem('id')

      const res = await axios.delete(`${BASE_API}/student-with-meeting`, {
         data: {
            student_id, 
            meeting_id
         }
      })
      if(res) {
         setRefresh(r => !r)
         message.success('Đã hủy thành công')
      }
      else {
         message.error('Đã có lỗi xảy ra')
      }
   }
   if (loading) return <p className="loading-text">Đang tải dữ liệu...</p>

   return (
      <div className="search-course-container">
         <div className="filter">
            <h2>Bộ lọc</h2>

            <div className="filter-container">
               <h3>Giảng viên</h3>
               <select
                  value={filterObj.tutor}
                  onChange={e => handleFilterChange('tutor', e.target.value)}
               >
                  <option value="">Tất cả</option>
                  {loadingTutor ? (
                     <option disabled>Đang tải...</option>
                  ) : (
                     tutors.map(item => (
                        <option key={item.id} value={item.full_name}>
                           {item.full_name}
                        </option>
                     ))
                  )}
               </select>
            </div>

            <div className="filter-container">
               <h3>Lĩnh vực</h3>
               <select
                  value={filterObj.major}
                  onChange={e => handleFilterChange('major', e.target.value)}
               >
                  <option value="" key={1}>
                     Tất cả
                  </option>
                  {loadingMajor ? (
                     <option disabled>Đang tải...</option>
                  ) : (
                     majors.map(item => (
                        <option key={item.id} value={item.name}>
                           {item.name}
                        </option>
                     ))
                  )}
               </select>
            </div>

            <button className="btn-login" onClick={handleResetFilter}>
               Đặt lại bộ lọc
            </button>
         </div>

         <div className="list-container">
            <input
               type="text"
               placeholder="Tìm kiếm khóa học hoặc giảng viên..."
               className="search-course-input"
               value={searchText}
               onChange={e => setSearchText(e.target.value)}
            />

            <h2>
               Danh sách khóa học
               {/* <span className="result-count"> ({filteredCourses.length} kết quả)</span> */}
            </h2>

            <span className='note-cancel'>Lưu ý: chỉ những khóa học chưa bắt đầu mới được phép hủy</span>
            {filteredCourses.length === 0 ? (
               <p className="no-result">Không tìm thấy khóa học nào phù hợp</p>
            ) : (
               <table>
                  <thead>
                     <tr>
                        <th>Môn học</th>
                        <th>Giảng viên</th>
                        <th>Bộ môn</th>
                        <th>Hình thức</th>
                        <th>Ngày bắt đầu</th>
                        <th>Trạng thái</th>
                     </tr>
                  </thead>
                  <tbody>
                     {console.log('course', filteredCourses)}
                     {filteredCourses.map((item, index) => (
                        <tr key={index}>
                           <td title={item.subject}>{item.subject}</td>
                           <td>{item.lecturer}</td>
                           <td>{item.department}</td>
                           <td>{item.mode}</td>
                           <td>{item.date_of_event}</td>
                           <td>
                              {item.status === 'Registered' ? (
                                 isPast(item.date_of_event) ? (
                                    <span className="status-badge registered">Đã đăng ký</span>
                                    
                                 ) : (
                                    <button className="status-badge unregister" onClick={() => handleCancelMeeting(item.id)}>
                                       Hủy đăng ký
                                    </button>
                                 )
                              ) : (
                                 !isPast(item.date_of_event) ? (
                                    <button className="status-badge register" onClick={() => handleSignUpMeeting(item.id)}>
                                    Đăng ký
                                 </button>
                                 ) : (
                                    <button className="status-badge exregister">Quá hạn đăng ký</button>
                                 )
                              )}
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            )}
         </div>
      </div>
   )
}

export default SearchCourse
