import './HistoryAppointment.scss'

import tatca from '@/assets/student/history/tatca.svg'
import dadienra from '@/assets/student/history/dadienra.svg'
import dangdienra from '@/assets/student/history/giangvien.svg'
import hinhthuc from '@/assets/student/history/hinhthuc.svg'
import sapdienra from '@/assets/student/history/sapdienra.svg'
import { useEffect, useState } from 'react'
import HistoryAppointmentStudentComponent from '@/components/student/history/HistoryAppointmentStudent.jsx'
import { useFetchAppointment } from '@/services/fetchAPI/useFetchAppointment.jsx'

/**
 * @typedef {"all" | "upcoming" | "finished" | "studying"} HistoryType
 */

const HistoryAppointment = () => {
   /** @type {[HistoryType, function]} */
   const [history, setHistory] = useState('all')
   const [refresh, setRefresh] = useState(true)
   const { appointment, loading } = useFetchAppointment(refresh) // array
   const [ListAppointment, setListAppointment] = useState(appointment)

   useEffect(() => {
      setListAppointment(appointment)
   }, [appointment])
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
                  onClick={() => setHistory('upcoming')}
                  className={history === 'upcoming' ? 'active' : ''}
               >
                  <img src={sapdienra} alt="sapdienra" />
                  Sắp diễn ra
               </li>

               <li
                  onClick={() => setHistory('finished')}
                  className={history === 'finished' ? 'active' : ''}
               >
                  <img src={dadienra} alt="dadienra" />
                  Đã diễn ra
               </li>

               <li
                  onClick={() => setHistory('studying')}
                  className={history === 'studying' ? 'active' : ''}
               >
                  <img src={dangdienra} alt="gv" />
                  Đang diễn ra
               </li>

            </ul>
         </div>
         <HistoryAppointmentStudentComponent history={history} />
      </div>
   )
}

export default HistoryAppointment
