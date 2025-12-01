import { useEffect, useState } from 'react'
import axios from '@/services/axios.customize'
import { BASE_API } from '@/constants'

export function useFetchMaterialByMeeting(refresh, meeting_id) {
   const [materials, setMaterials] = useState([])
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      const fetchData = async () => {
         // console.log('11')
         try {
            const response = await axios.get(`${BASE_API}/material/meeting/${meeting_id}`)

            const sorted = response.data.data.sort(
               (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            )
            console.log('response material', meeting_id, sorted)

            // Nhóm theo title
            const groupedByTitle = {}

            sorted.forEach(mt => {
               const title = mt.title || 'Không có tiêu đề'

               if (!groupedByTitle[title]) {
                  groupedByTitle[title] = {
                     title: title,
                     meeting: mt.meeting,
                     contents: [],
                  }
               }

               groupedByTitle[title].contents.push({
                  _id: mt._id,
                  content: mt.content,
                  file: mt.file,
                  createdAt: mt.createdAt,
                  updatedAt: mt.updatedAt,
               })
            })

            // Chuyển object thành array
            const result = Object.values(groupedByTitle)

            console.log('Grouped result:', result)
            setMaterials(result)

            // setMaterials(sorted)

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
