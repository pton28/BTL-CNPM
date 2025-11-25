import axios from '@/services/axios.customize'
import './formChangeSchedule.scss'
import { useEffect, useState } from 'react'
import { BASE_API } from '../../../constants'
import { useParams } from 'react-router-dom'


const FormChangeSchedule = ({refresh, setRefresh, selectedSSId, setShowFormChangeSchedule }) => {
   const [slots, setSlots] = useState([])
   const [slotOfStudent, setSlotOfStudent] = useState()
   const student_id = localStorage.getItem('id')
   const { id } = useParams()
   // lưu trữ chỉ số hàng được chọn
   const [selectedId, setSelectedId] = useState(null)
   const handleChoose = index => {
      setSelectedId(index)
   }

   const formatDate = dateStr => {
      if (!dateStr) return ''
      return new Date(dateStr).toLocaleDateString('vi-VN', {
         day: '2-digit',
         month: '2-digit',
         year: 'numeric',
      })
   }

   useEffect(() => {
      const fetchData = async () => {
         try {
            console.log('ss id', selectedSSId)
            // dữ liệu hiển thị trong form
            const resp = await axios.get(`${BASE_API}/session-slot/session/${selectedSSId}`)
            if (resp) {
               setSlots(resp.data.data)
               console.log('resp', resp.data.data)
            }

            // tất cả những slot sinh viên đã đk
            const resp_slot_of_student = await axios.get(`${BASE_API}/student-with-session-slot/student/${student_id}/meeting/${id}`)
            if(resp_slot_of_student){
               const filter_slot_of_student = resp_slot_of_student.data.data.filter(item => item.session._id === selectedSSId)[0]
               setSlotOfStudent(filter_slot_of_student)
               setSelectedId(filter_slot_of_student.slot._id)
               console.log('resp slot of student', filter_slot_of_student)
            }

         } catch (error) {
            console.log('Er at formChangeSchedule')
         }
      }
      fetchData()
   }, [])

   const HandleSignUp = async slot_id => {
      try {
         const obj = {
            student: student_id,
            session: selectedSSId,
            slot: slot_id,
            meeting: id,
         }
         // console.log('obj', obj)
         const resp = await axios.post(`${BASE_API}/student-with-session-slot`, obj)
         // console.log('success sign up', resp)
         setRefresh(refresh => !refresh)
         setShowFormChangeSchedule(false)
      } catch (error) {
         console.log('er at sign up slot', error)
         setShowFormChangeSchedule(false)
      }

      setShowFormChangeSchedule(false)
   }

   if(!slots) return <p>Loading ...</p>
   return (
      <div className="form-change-schedule-container">
         <h3>Chọn lịch học của bạn</h3>
         <div className="table-wrapper">
            <table className="info-table">
               <thead>
                  <tr>
                     <th>STT</th>
                     <th>Giờ</th>
                     <th>Thời gian</th>
                     <th>Địa điểm</th>
                     <th>Trạng thái</th>
                  </tr>
               </thead>
               <tbody>
                  {slots.map((row, index) => (
                     <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{row.start_time}</td>
                        <td>{formatDate(row.date)}</td>
                        <td>{row.location_or_link}</td>
                        <td
                           onClick={() => handleChoose(row._id)}
                           className={selectedId === row._id ? 'active' : ''}
                        >
                           {selectedId === row._id ? 'Đã chọn' : 'Chọn'}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>

         <div className="group-button">
            <button className="btn-close" onClick={() => setShowFormChangeSchedule(false)}>
               Hủy
            </button>
            <button className="btn-save" onClick={() => HandleSignUp(selectedId)}>
               Lưu
            </button>
         </div>
      </div>
   )

}

export default FormChangeSchedule
