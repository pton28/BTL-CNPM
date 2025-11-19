import { useState } from 'react'
import './SearchCourse.scss'
import { useFetchAllMeeting } from '../../../services/fetchAPI/useFetchAllMeeting'
import axios from 'axios'
import { BASE_API } from '../../../constants'
import { useFetchAllTutor } from '../../../services/fetchAPI/useFetchAllTutor'

//! Chưa làm bộ lọc
const SearchCourse = () => {
   const faculties = [
      { value: 'cntt', name: 'Công nghệ thông tin' },
      { value: 'dtvt', name: 'Điện - Điện tử Viễn thông' },
      { value: 'ck', name: 'Cơ khí' },
      { value: 'xd', name: 'Xây dựng' },
      { value: 'qtkd', name: 'Quản trị kinh doanh' },
      { value: 'kt', name: 'Kinh tế' },
      { value: 'qlcn', name: 'Quản lý công nghiệp' },
      { value: 'hh', name: 'Hóa học' },
      { value: 'mt', name: 'Môi trường' },
      { value: 'nn', name: 'Ngoại ngữ' },
   ]
   const [refresh, setRefresh] = useState(true)
   const { data: courses, loading } = useFetchAllMeeting(refresh)

   const [refreshTutor, setRefreshTutor] = useState(true)
   const { tutors, loading: loadingtutor } = useFetchAllTutor(refreshTutor)

   const [filterObj, setFilterObj] = useState({ major: '', tutor: '' })

   const HandleSignUpMeeting = async meeting_id => {
      const studentId = localStorage.getItem('id')

      try {
         const obj = {
            student_id: studentId,
            meeting_id: meeting_id,
         }
         const resp = await axios.post(`${BASE_API}/student-with-meeting`, obj)
         if (resp.status === 201) setRefresh(refresh => !refresh)
      } catch (error) {
         console.log('Error at Search Course: sign up meeting by student', error)
      }
   }

   const Handlefillter = () => {}
   return (
      <div className="search-course-container">
         <div className="filter">
            <h2>Bộ lọc</h2>
            {/* <div className="filter-container">
               <h3>Khoa</h3>
               <select>
                  {faculties.map((item, index) => (
                     <option key={index} value={item.value}>
                        {item.name}
                     </option>
                  ))}
               </select>
            </div> */}

            <div className="filter-container">
               <h3>Giảng viên</h3>
               <select onChange={e => setFilterObj(prev => ({ ...prev, major: e.target.value }))}>
                  {loadingtutor ? (
                     <>Đang tải ...</>
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
               <select onChange={e => setFilterObj(prev => ({ ...prev, major: e.target.value }))}>
                  {faculties.map((item, index) => (
                     <option key={index} value={item.value}>
                        {item.name}
                     </option>
                  ))}
               </select>
            </div>

            <button className={'btn-login'} onClick={Handlefillter}>
               Lọc
            </button>
         </div>

         <div className="list-container">
            <input
               type={'text'}
               placeholder={'Tìm kiếm khóa học'}
               className={'search-course-input'}
            />
            <h2>Tất cả các khóa học</h2>

            <table>
               <thead>
                  <tr>
                     <th>Môn học</th>
                     <th>Giảng viên</th>
                     <th>Bộ môn</th>
                     <th>Hình thức</th>
                     <th>Trạng thái</th>
                  </tr>
               </thead>
               <tbody>
                  {courses.map((item, index) => (
                     <tr key={index}>
                        <td>{item.subject}</td>
                        <td>{item.lecturer}</td>
                        <td>{item.department}</td>
                        <td>{item.mode}</td>
                        <td>
                           {item.status === 'Registered' ? (
                              <span className="status-badge register">Đã đăng ký</span>
                           ) : (
                              <span
                                 className="status-badge registered"
                                 onClick={() => HandleSignUpMeeting(item.id)}
                              >
                                 Đăng ký
                              </span>
                           )}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   )
}

export default SearchCourse
