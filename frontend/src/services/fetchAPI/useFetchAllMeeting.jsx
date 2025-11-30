import { useEffect, useState } from 'react'
import axios from '@/services/axios.customize'
import { BASE_API } from '@/constants'

export function useFetchAllMeeting(refresh) {
   const [processedData, setProcessedData] = useState([])
   const [loading, setLoading] = useState(true)

   const formatDate = dateStr => {
      if (!dateStr || dateStr === 'No') return 'No'
      return new Date(dateStr).toLocaleDateString('vi-VN', {
         day: '2-digit',
         month: '2-digit',
         year: 'numeric',
      })
   }

   useEffect(() => {
      const fetchData = async () => {
         const student_id = localStorage.getItem('id')
         setLoading(true)
         try {
            // 1. Dùng Promise.all để gọi 2 API cùng lúc và đợi tất cả xong
            const [resApptSt, resMt] = await Promise.all([
               axios.get(`${BASE_API}/student-with-meeting/${student_id}`),
               axios.get(`${BASE_API}/meeting`),
            ])

            const rawAppointmentStudent = resApptSt.data.data || []
            const rawMeeting = resMt.data.data || []
            // console.log('data', rawAppointmentStudent, rawMeeting)
            // ===========================================================
            // 3. KHU VỰC XỬ LÝ DỮ LIỆU (Nằm ở đây là chuẩn nhất)
            // ===========================================================
            let finalResult = []

            rawMeeting.forEach(appt => {
               const status = rawAppointmentStudent.find(m => m.meeting_id._id === appt._id)
                  ? 'Registered'
                  : 'Unregistered'
               // console.log('appt', appt)
               const obj = {
                  id: appt._id,
                  subject: appt.title_meeting,
                  lecturer: appt.tutor.full_name,
                  department: appt.major?.name || 'Chưa cập nhật',
                  mode: appt.method,
                  status: status,
                  date_of_event: formatDate(appt.date_of_event),
               }
               finalResult.push(obj)
            })

            setProcessedData(finalResult)
         } catch (err) {
            console.log('Error fetching data', err)
            setProcessedData([])
         } finally {
            setLoading(false)
         }
      }

      fetchData()
   }, [refresh])

   return {
      data: processedData,
      loading,
   }
}
