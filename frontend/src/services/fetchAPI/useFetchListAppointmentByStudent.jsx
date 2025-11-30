import { useEffect, useState } from 'react'
import axios from '@/services/axios.customize'
import { BASE_API } from '../../constants'

export function useFetchListAppointmentByStudent(refresh) {
   const [processedData, setProcessedData] = useState([])
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      const fetchData = async () => {
         const student_id = localStorage.getItem('id')
         setLoading(true)
         try {
            // 1. Dùng Promise.all để gọi 3 API cùng lúc và đợi tất cả xong
            const [resAppt, resMajor, resTutor, resSlot] = await Promise.all([
               axios.get(`${BASE_API}/student-with-meeting/${student_id}`),
               axios.get(`${BASE_API}/major`),
               axios.get(`${BASE_API}/tutor`),
               axios.get(`${BASE_API}/student-with-session-slot`),
            ])

            const rawAppointments = resAppt.data.data || []
            const rawMajors = resMajor.data.data || []
            const rawTutors = resTutor.data.data || []
            const rawSlots = resSlot.data.data || []

            // console.log(rawMajors,rawTutors)
            // ===========================================================
            // 3. KHU VỰC XỬ LÝ DỮ LIỆU (Nằm ở đây là chuẩn nhất)
            // ===========================================================

            // Hàm kiểm tra slot đã qua hay chưa
            const isPastSlot = slotDate => {
               if (!slotDate) return false
               const slotDateTime = new Date(slotDate)
               const now = new Date()
               return slotDateTime < now
            }

            // Đếm số slot theo meeting_id
            const slotCountByMeeting = {}
            rawSlots.forEach(slot => {
               const meetingId = slot.meeting?._id
               if (meetingId && isPastSlot(slot.slot.date)) {
                  slotCountByMeeting[meetingId] = (slotCountByMeeting[meetingId] || 0) + 1
               }
            })

            // Nhóm appointments theo meeting_id để loại bỏ duplicate
            const appointmentsByMeeting = {}
            rawAppointments.forEach(appt => {
               const meetingId = appt.meeting?._id
               if (meetingId && !appointmentsByMeeting[meetingId]) {
                  appointmentsByMeeting[meetingId] = appt
               }
            })
            const finalResult = rawAppointments.map(appt => {
               // Tìm Major tương ứng với appointment
               const majorInfo = rawMajors.find(m => m._id === appt.meeting_id.major) // thay majorId bằng tên trường thật

               // Tìm Tutor tương ứng với appointment
               const tutorInfo = rawTutors.find(t => t._id === appt.meeting_id.tutor) // thay tutorId bằng tên trường thật

               const meeting_id = appt.meeting_id._id

               const registeredSlots = slotCountByMeeting[meeting_id] || 0
               // Trả về object mới đã gộp thông tin
               return {
                  ...appt, // Giữ lại thông tin gốc của lịch hẹn
                  majorName: majorInfo ? majorInfo.name : 'Chưa rõ',
                  tutorName: tutorInfo ? tutorInfo.full_name : 'Chưa rõ',
                  progress: appt.meeting_id?.session_count
                     ? Math.round((registeredSlots / appt.meeting_id.session_count) * 100)
                     : 0, // Tiến độ %
                  // Thêm bất cứ trường nào bạn muốn gộp
               }
            })

            // console.log('Dữ liệu sau khi xử lý bực:', finalResult)

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