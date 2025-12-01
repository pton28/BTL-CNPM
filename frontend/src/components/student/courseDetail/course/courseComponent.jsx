import { useParams } from 'react-router-dom'
import './courseComponent.scss'
import { useState } from 'react'
import { useFetchMaterialByMeeting } from '../../../../services/fetchAPI/useFetchMaterialByMeeting'

const CourseComponent = () => {
   const { id } = useParams()

   const [refresh, setRefresh] = useState(true)
   const { data: listDocs, loading: loading } = useFetchMaterialByMeeting(refresh, id)

   console.log('doc', listDocs)
   if (loading) return <p>Loading ...</p>
   return (
      <div className="course-component-container">
         {listDocs?.length > 0 &&
            listDocs.map(doc => (
               <div className="group-document" key={doc._id}>
                  <h3>{doc.title}</h3>
                  <ul>
                     {doc.contents.map(item => (
                        <li>
                           <div className="content">{item.content}</div>
                           {item.file && <div className='inner-file'>
                              <span className="icon-folder" style={{ marginRight: '10px' }}>
                                 <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="#333"
                                    stroke="currentColor"
                                    strokeWidth="0"
                                 >
                                    <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path>
                                 </svg>
                              </span>
                              <div className="file">{item.file}</div>
                           </div>}
                        </li>
                     ))}
                  </ul>
               </div>
            ))}
      </div>
   )
}

export default CourseComponent
