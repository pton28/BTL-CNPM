import { useEffect, useState } from 'react'
import axios from '@/services/axios.customize'
import { BASE_API } from '../../constants'

export function useFetchAllTutor(refresh) {
   const [tutors, setTutors] = useState([])
   const [loading, setLoading] = useState(true)
   // const token
   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get(
               `${BASE_API}/tutor`
            )
            setTutors(response.data.data)
            console.log('response', response)
            setLoading(false)
         } catch (err) {
            console.log('Error at useFetchAllTutor', err)
            setLoading(false)
         }
      }
      fetchData()
   }, [refresh])
   return { tutors, loading } // array
}

