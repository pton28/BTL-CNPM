import { useEffect, useState } from 'react'
import axios from '@/services/axios.customize'
import { BASE_API } from '@/constants'

export function useFetchMeetingByTutor(refresh) {
   const [data, setData] = useState([])
   const [loading, setLoading] = useState(true)

   const formatDate = dateStr => {
      if (!dateStr) return 'Chưa cập nhật'
      return new Date(dateStr).toLocaleDateString('vi-VN', {
         day: '2-digit',
         month: '2-digit',
         year: 'numeric',
      })
   }

   useEffect(() => {
      const fetchData = async () => {
         // 1. LẤY ID TỪ LOCAL STORAGE (Do file LoginTutor.jsx đã setItem('id', ...))
         const tutorId = localStorage.getItem('id') //

         if (!tutorId) {
            console.log('Chưa tìm thấy Tutor ID trong LocalStorage')
            setLoading(false)
            return
         }

         setLoading(true)
         try {
            const response = await axios.get(`${BASE_API}/meeting/tutor/${tutorId}`)

            const rawData = response.data.data || []

            // Map dữ liệu
            const formattedData = rawData.map(item => ({
               id: item._id,
               title: item.title_meeting,
               start_date: formatDate(item.date_of_event),
               session_count: item.session_count || 0,
               method: item.method,
               major_name: item.major?.name || 'Chưa rõ',
            }))

            setData(formattedData)
         } catch (err) {
            console.log('Error fetching meetings by ID', err)
            setData([])
         } finally {
            setLoading(false)
         }
      }

      fetchData()
   }, [refresh])

   return {
      data,
      loading,
   }
}
