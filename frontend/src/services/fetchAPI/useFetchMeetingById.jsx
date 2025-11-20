import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_API } from '../../constants'

export function useFetchMeetingById(refresh, meeting_id) {
   const [meeting, setMeeting] = useState([])
   const [loading, setLoading] = useState(true)
   // const token
   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get(
               `${BASE_API}/meeting/${meeting_id}`
            )
            setMeeting(response.data.data)
            console.log('response', response)
            setLoading(false)
         } catch (err) {
            console.log('Error at useFetchAllMajor', err)
            setLoading(false)
         }
      }
      fetchData()
   }, [refresh])
   return { data: meeting, loading: loading } // array
}

