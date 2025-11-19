import { useEffect, useState } from 'react'
import axios from 'axios'

export function useFetchAppointment(refresh) {
   const [appointment, setAppointment] = useState([])
   const [loading, setLoading] = useState(true)
   // const token
   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get(`https://dummyjson.com/users`)
            setAppointment(response.data)
            console.log('response fake', response)
            setLoading(false)
         } catch (err) {
            console.log('Error at useFetchAppointment', err)
            setLoading(false)
         }
      }
      fetchData()
   }, [refresh])
   return { appointment, loading } // array
}
