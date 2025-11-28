import { useEffect, useState } from 'react'
import axios from '@/services/axios.customize'
import { BASE_API } from '../../constants'

export function useFetchAllSessionOfAMeetingVu(refresh, meeting_id) {
   const [processedData, setProcessedData] = useState([]) 
   const [loading, setLoading] = useState(true)

   const student_id = localStorage.getItem('id')
   useEffect(() => {
      const fetchData = async () => {
         setLoading(true)
         try {
            // 1. Dùng Promise.all để gọi 3 API cùng lúc và đợi tất cả xong
            const [resSs, resSlot] = await Promise.all([
               axios.get(`${BASE_API}/session/meeting/${meeting_id}`),
               axios.get(`${BASE_API}/student-with-session-slot/student/${student_id}/meeting/${meeting_id}`),
            ])

            const rawSessionByMeeting = resSs.data.data || []
            const rawStdSlot = resSlot.data.data || []
            // ===========================================================
            // 3. KHU VỰC XỬ LÝ DỮ LIỆU (Nằm ở đây là chuẩn nhất)
            // ===========================================================
            // console.log('rawStdSlot', rawStdSlot, rawSessionByMeeting)
            let finalResult = []
            rawSessionByMeeting.forEach(ss => {
                const ssId = ss._id

                const StdWithSlot = rawStdSlot.find(slot => slot.session._id === ssId) || {}

                const slot = StdWithSlot.slot || {}
               //  console.log('slot inner', slot)
                const obj = {
                    ss_id: ss._id,
                    title: ss.title,
                    date: slot.date || 'No',
                    start_time: slot.start_time || 'No',
                    end_time: slot.end_time || 'No',
                    location: slot.location_or_link || 'No',
                }
                finalResult.push(obj)
            })
            
            const sorted = finalResult.sort(
               (a, b) => new Date(a.title) - new Date(b.title)
            )
            // console.log('Dữ liệu sau khi xử lý 1:', sorted)

            // 4. Lưu dữ liệu ĐÃ XỬ LÝ vào state
            setProcessedData(sorted)
            
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