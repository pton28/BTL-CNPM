import { useEffect, useState } from 'react'
import axios from '@/services/axios.customize';
import { BASE_API } from '../../constants'

export function useFetchListAppointmentByStudent(refresh) {
   const [processedData, setProcessedData] = useState([]) 
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      const fetchData = async () => {
         setLoading(true)
         try {
            // 1. Dùng Promise.all để gọi 3 API cùng lúc và đợi tất cả xong
            const [resAppt, resMajor, resTutor] = await Promise.all([
               axios.get(`${BASE_API}/student-with-meeting/6918473d48f8cffae6fe71e2`),
               axios.get(`${BASE_API}/major`),
               axios.get(`${BASE_API}/tutor`)
            ])

            const rawAppointments = resAppt.data.data || []
            const rawMajors = resMajor.data.data || []
            const rawTutors = resTutor.data.data || []
            // console.log(rawMajors,rawTutors)
            // ===========================================================
            // 3. KHU VỰC XỬ LÝ DỮ LIỆU (Nằm ở đây là chuẩn nhất)
            // ===========================================================
            
            const finalResult = rawAppointments.map((appt) => {
               // Tìm Major tương ứng với appointment
               const majorInfo = rawMajors.find(m => m._id === appt.meeting_id.major) // thay majorId bằng tên trường thật
               
               // Tìm Tutor tương ứng với appointment
               const tutorInfo = rawTutors.find(t => t._id === appt.meeting_id.tutor) // thay tutorId bằng tên trường thật

               // Trả về object mới đã gộp thông tin
               return {
                  ...appt, // Giữ lại thông tin gốc của lịch hẹn
                  majorName: majorInfo ? majorInfo.name : 'Chưa rõ',
                  tutorName: tutorInfo ? tutorInfo.full_name : 'Chưa rõ',
                  // Thêm bất cứ trường nào bạn muốn gộp
               }
            })

            console.log('Dữ liệu sau khi xử lý 1:', finalResult)

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
      loading 
   }
}