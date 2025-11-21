import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import './listSubjects.scss'

const listSubjects = () => {
   const navigate = useNavigate()
   return (
      <div className="list-subject-title">
         <h1>Danh sách các môn giảng dạy của tôi</h1>
         <div className="list-subject-container">
            <h2>Thông tin chi tiết</h2>
            <div className="subject-item">
               <div
                  className="btn-thumbnail"
                  onClick={() => navigate('/tutor/subject-Details')}
               ></div>
               <div className="subject-info">
                  <div
                     className="btn-subject-name"
                     onClick={() => navigate('/tutor/subject-Details')}
                  >
                     Xử lý ngôn ngữ tự nhiên
                  </div>
                  <div className="subject-schedule">Ngày bắt đầu: 22/06/2025</div>
                  <div className="subject-detail">Số lượng sinh viên tham gia:</div>
               </div>
            </div>
            <div className="subject-item">
               <div
                  className="btn-thumbnail"
                  onClick={() => navigate('/tutor/subject-Details')}
               ></div>
               <div className="subject-info">
                  <div
                     className="btn-subject-name"
                     onClick={() => navigate('/tutor/subject-Details')}
                  >
                     Xử lý ngôn ngữ tự nhiên
                  </div>
                  <div className="subject-schedule">Ngày bắt đầu: 22/06/2025</div>
                  <div className="subject-detail">Số lượng sinh viên tham gia:</div>
               </div>
            </div>
            <div className="subject-item">
               <div
                  className="btn-thumbnail"
                  onClick={() => navigate('/tutor/subject-Details')}
               ></div>
               <div className="subject-info">
                  <div
                     className="btn-subject-name"
                     onClick={() => navigate('/tutor/subject-Details')}
                  >
                     Xử lý ngôn ngữ tự nhiên
                  </div>
                  <div className="subject-schedule">Ngày bắt đầu: 22/06/2025</div>
                  <div className="subject-detail">Số lượng sinh viên tham gia:</div>
               </div>
            </div>
            <div className="subject-item">
               <div
                  className="btn-thumbnail"
                  onClick={() => navigate('/tutor/subject-Details')}
               ></div>
               <div className="subject-info">
                  <div
                     className="btn-subject-name"
                     onClick={() => navigate('/tutor/subject-Details')}
                  >
                     Xử lý ngôn ngữ tự nhiên
                  </div>
                  <div className="subject-schedule">Ngày bắt đầu: 22/06/2025</div>
                  <div className="subject-detail">Số lượng sinh viên tham gia:</div>
               </div>
            </div>
            <div className="subject-item">
               <div
                  className="btn-thumbnail"
                  onClick={() => navigate('/tutor/subject-Details')}
               ></div>
               <div className="subject-info">
                  <div
                     className="btn-subject-name"
                     onClick={() => navigate('/tutor/subject-Details')}
                  >
                     Xử lý ngôn ngữ tự nhiên
                  </div>
                  <div className="subject-schedule">Ngày bắt đầu: 22/06/2025</div>
                  <div className="subject-detail">Số lượng sinh viên tham gia:</div>
               </div>
            </div>
            <div className="subject-item">
               <div
                  className="btn-thumbnail"
                  onClick={() => navigate('/tutor/subject-Details')}
               ></div>
               <div className="subject-info">
                  <div
                     className="btn-subject-name"
                     onClick={() => navigate('/tutor/subject-Details')}
                  >
                     Xử lý ngôn ngữ tự nhiên
                  </div>
                  <div className="subject-schedule">Ngày bắt đầu: 22/06/2025</div>
                  <div className="subject-detail">Số lượng sinh viên tham gia:</div>
               </div>
            </div>
            <div className="pagination-wrapper">
               <a href="#" className="page-link">
                  <FontAwesomeIcon icon={faChevronLeft} />
               </a>
               <a href="#" className="page-link active">
                  1
               </a>
               <a href="#" className="page-link">
                  2
               </a>
               <a href="#" className="page-link">
                  3
               </a>
               <a href="#" className="page-link">
                  4
               </a>
               <span className="page-dots">...</span>
               <a href="#" className="page-link">
                  40
               </a>
               <a href="#" className="page-link">
                  <FontAwesomeIcon icon={faChevronRight} />
               </a>
            </div>
         </div>
      </div>
   )
}

export default listSubjects
