import { useEffect, useState } from 'react'
import axios from '@/services/axios.customize';
import { BASE_API } from '../../constants'

export function useFetchMeetingById(refresh, meeting_id) {
   const [data, setData] = useState(null)
   const [loading, setLoading] = useState(true)
   // const token
   useEffect(() => {
      const fetchData = async () => {
         try {
            const fetchMeeting = await axios.get(`${BASE_API}/meeting/${meeting_id}`)
            const fetchMaterials = axios.get(`${BASE_API}/material/meeting/${meeting_id}`)

            const [meetingRes, materialRes] = await Promise.all([fetchMeeting, fetchMaterials])

            const meetingInfo = meetingRes.data.data || {}
            const materialsList = materialRes.data.data || []

            const fullData = {
               ...meetingInfo,      // Bung toàn bộ thông tin meeting (title, date...)
               materials: materialsList // Nhét thêm danh sách tài liệu vào key 'materials'
            }

            setData(fullData)
            setLoading(false)

         } catch (err) {
            console.log('Error at useFetchAllMajor', err)
            setLoading(false)
         }
      }
      fetchData()
   }, [refresh, meeting_id])
   return { data, loading} // array
}
