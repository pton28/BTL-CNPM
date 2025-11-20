import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_API } from '@/constants'

export function useFetchMaterialByMeeting(refresh, meeting_id) {
   const [materials, setMaterials] = useState([])
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get(
               `${BASE_API}/material/meeting/${meeting_id}`
            )

            const sorted = response.data.data.sort(
               (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            )

            setMaterials(sorted)
            console.log('response material', meeting_id, response)
            setLoading(false)
         } catch (err) {
            console.log('Error at useFetchMaterialByMeeting', err)
            setLoading(false)
         }
      }
      fetchData()
   }, [refresh])

   return { data: materials, loading }
}
