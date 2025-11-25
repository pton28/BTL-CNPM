import { useEffect, useState } from 'react'
import axios from '@/services/axios.customize'
import { BASE_API } from '../../constants'

export function useFetchAllSessionOfAMeeting(refresh) {
   const [processedData, setProcessedData] = useState([])
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      const fetchData = async () => {
         setLoading(true)
         try {
            // 1. Dùng Promise.all để gọi 2 API cùng lúc và đợi tất cả xong
            const [resApptSt, resMt, resTutor] = await Promise.all([
               axios.get(`${BASE_API}/student-with-meeting/6918473d48f8cffae6fe71e2`),
               axios.get(`${BASE_API}/meeting`),
            ])

            const rawAppointmentStudent = resApptSt.data.data || []
            const rawMeeting = resMt.data.data || []
            console.log(rawAppointmentStudent, rawMeeting)
            // ===========================================================
            // 3. KHU VỰC XỬ LÝ DỮ LIỆU (Nằm ở đây là chuẩn nhất)
            // ===========================================================
            let finalResult = []

            rawMeeting.forEach(appt => {
               const status = rawAppointmentStudent.find(m => m.meeting_id._id === appt._id)
                  ? 'Registered'
                  : 'Unregistered'
               console.log('apppt', appt)
               const obj = {
                  id: appt._id,
                  subject: appt.title_meeting,
                  lecturer: appt.tutor.full_name,
                  department: appt.major.name,
                  mode: appt.method,
                  status: status,
               }
               finalResult.push(obj)
            })

            console.log('Dữ liệu sau khi xử lý:', finalResult)

            // 4. Lưu dữ liệu ĐÃ XỬ LÝ vào state
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
