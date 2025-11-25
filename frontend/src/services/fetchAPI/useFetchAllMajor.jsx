import { useEffect, useState } from 'react'
import axios from '@/services/axios.customize'
import { BASE_API } from '../../constants'

export function useFetchAllMajor(refresh) {
   const [majors, setMajors] = useState([])
   const [loading, setLoading] = useState(true)
   // const token
   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get(
               `${BASE_API}/major`
            )
            setMajors(response.data.data)
            console.log('response major', response)
            setLoading(false)
         } catch (err) {
            console.log('Error at useFetchAllMajor', err)
            setLoading(false)
         }
      }
      fetchData()
   }, [refresh])
   return { majors, loading } // array
}

