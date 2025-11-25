import './HistoryAppointment.scss'

import tatca from '@/assets/student/history/tatca.svg'
import dadienra from '@/assets/student/history/dadienra.svg'
import giangvien from '@/assets/student/history/giangvien.svg'
import hinhthuc from '@/assets/student/history/hinhthuc.svg'
import sapdienra from '@/assets/student/history/sapdienra.svg'
import { useEffect, useState } from 'react'
import HistoryAppointmentStudentComponent from '@/components/student/history/HistoryAppointmentStudent.jsx'
import { useFetchAppointment } from '@/services/fetchAPI/useFetchAppointment.jsx'
import { useNavigate } from 'react-router-dom'

/**
 * @typedef {"all" | "upcoming" | "past" | "studying" } HistoryType
 * *Nếu là upcoming thì so sánh theo ngày giờ hiện tại -> nếu chưa tới sẽ là upcoming
 * * Nếu past thì so sánh với tiến độ -> nếu 100% thì đã hoàn thành
 */

const HistoryAppointment = () => {
   /** @type {[HistoryType, function]} */
   const [history, setHistory] = useState('all')
   const [refresh, setRefresh] = useState(true)
   const { appointment, loading } = useFetchAppointment(refresh) // array
   const [ListAppointment, setListAppointment] = useState(appointment)

   const navigate = useNavigate()
   useEffect(() => {
      setListAppointment(appointment)
   }, [appointment])

   const HandleLogout = () => {
    localStorage.removeItem('id')
    localStorage.removeItem('token')
    navigate('/pre-login')
   }
   return (
      <div className="history-container">
         {/* {!loading && console.log('List', ListAppointment)} */}
         <div className="tab">
            <h2>Phân loại</h2>
            <ul>
               <li onClick={() => setHistory('all')} className={history === 'all' ? 'active' : ''}>
                  <img src={tatca} alt="tatca" />
                  Tất cả
               </li>

               <li
                  onClick={() => setHistory('studying')}
                  className={history === 'studying' ? 'active' : ''}
               >
                  <img src={giangvien} alt="dadienra" />
                  Đang học
               </li>
               <li
                  onClick={() => setHistory('upcoming')}
                  className={history === 'upcoming' ? 'active' : ''}
               >
                  <img src={sapdienra} alt="sapdienra" />
                  Sắp diễn ra
               </li>

               <li
                  onClick={() => setHistory('past')}
                  className={history === 'past' ? 'active' : ''}
               >
                  <img src={dadienra} alt="dadienra" />
                  Đã hoàn thành
               </li>

               {/* <li
                        onClick={() => setHistory('teacher')}
                        className={history === 'teacher' ? 'active' : ''}
                    >
                        <img src={giangvien} alt="gv" />
                        Phân loại theo Giảng viên
                    </li> */}

                    <li
                        onClick={() => HandleLogout()}
                        className={history === 'type' ? 'active' : ''}
                    >
                        <img src={hinhthuc} alt="hinhthuc" />
                        Đăng xuất
                    </li>
            </ul>
         </div>
         <HistoryAppointmentStudentComponent history={history} />
      </div>
   )
}

export default HistoryAppointment
