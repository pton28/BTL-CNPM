import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_API } from '@/constants'

export function useFetchStudentSlot(refresh) {
   const [studentSlots, setStudentSlots] = useState([])
   const [loading, setLoading] = useState(true)
   // const token
   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get(
               `${BASE_API}/student-with-session-slot`
            )
            setStudentSlots(response.data.data)
            console.log('response student-with-session-slot', response)
            setLoading(false)
         } catch (err) {
            console.log('Error at student-with-session-slot', err)
            setLoading(false)
         }
      }
      fetchData()
   }, [refresh])
   return { data: studentSlots, loading: loading } // array
}

