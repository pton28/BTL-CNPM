import { useParams } from 'react-router-dom'
import './courseComponent.scss'
import { useState } from 'react'
import { useFetchMaterialByMeeting } from '../../../../services/fetchAPI/useFetchMaterialByMeeting'

const CourseComponent = () => {
   const { id } = useParams()

   const [refresh, setRefresh] = useState(true)
   const {data: listDocs, loading: loading} = useFetchMaterialByMeeting(refresh, id)

   return (
      <div className="course-component-container">
         {!loading && console.log('docs', listDocs)}
         {!loading && listDocs.length > 0 && listDocs.map(doc => (
            <div className="group-document" key={doc._id}>
               <h3>{doc.title}</h3>
               <ul>
                  <li>{doc.content}</li>

               </ul>
         </div>
         ))}
      </div>
   )
}

export default CourseComponent
