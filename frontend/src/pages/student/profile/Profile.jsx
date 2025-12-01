import { useState, useEffect } from 'react'
import './Profile.scss'
import axios from '@/services/axios.customize'
import { BASE_API } from '@/constants'


const ProfileStudent = () => {
  // Hardcode data - bạn sẽ thay bằng axios sau

  const [studentData, setStudentData] = useState(null)
  const [loading, setLoading] = useState(true)

//     const studentData = {
//     "_id": "692c4a7c8fb4ce3d52d9fe5a",
//     "full_name": "Lâm Hoàng Vũ",
//     "email": "vu.lamhoang05@hcmut.edu.vn",
//     "password": "$2a$12$p49Q1oJm8bIYVQUpknMQJ.h9IV1C5uWil/3vhniv7/Ii5E50sZj6u",
//     "faculty_id": {
//       "_id": "69188d7948f8cffae6fe721a",
//       "name": "Khoa học và Kỹ thuật Máy tính"
//     },
//     "role_id": 2,
//     "is_active": true,
//     "id_student": "stu 001"
//   }
  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const studentId = localStorage.getItem('id')
        const res = await axios.get(`${BASE_API}/student/${studentId}`)
        
        if (res.data.EC === 0) {
          setStudentData(res.data.data)
        }
      } catch (error) {
        console.log('Error fetching student profile:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStudentProfile()
  }, [])

  if (loading) return <div className="loading">Đang tải...</div>
  if (!studentData) return <div className="error">Không tìm thấy thông tin</div>

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        {/* Header Card */}
        <div className="profile-header">
          <div className="header-content">
            {/* Avatar */}
            <div className="avatar">
              {studentData.full_name.charAt(0)}
            </div>
            
            {/* Name and Role */}
            <div className="user-info">
              <h1 className="user-name">{studentData.full_name}</h1>
              <p className="user-role">
                <span className="icon">🛡️</span>
                Sinh viên
              </p>
            </div>

            {/* Status Badge */}
            <div className={`status-badge ${studentData.is_active ? 'active' : 'inactive'}`}>
              <span className="status-icon">
                {studentData.is_active ? '✓' : '✕'}
              </span>
              <span className="status-text">
                {studentData.is_active ? 'Đang hoạt động' : 'Không hoạt động'}
              </span>
            </div>
          </div>
        </div>

        {/* Details Card */}
        <div className="profile-details">
          <h2 className="details-title">Chi tiết người dùng</h2>

          <div className="details-list">
            {/* Student ID */}
            <div className="detail-item">
              <div className="detail-icon blue">
                <span>👤</span>
              </div>
              <div className="detail-content">
                <p className="detail-label">Mã sinh viên</p>
                <p className="detail-value">{studentData.id_student}</p>
              </div>
            </div>

            {/* Email */}
            <div className="detail-item">
              <div className="detail-icon purple">
                <span>✉️</span>
              </div>
              <div className="detail-content">
                <p className="detail-label">Địa chỉ thư điện tử</p>
                <p className="detail-value">{studentData.email}</p>
                <p className="detail-note">
                  (Các thành viên khóa học có thể nhìn thấy)
                </p>
              </div>
            </div>

            {/* Faculty */}
            <div className="detail-item">
              <div className="detail-icon green">
                <span>🏢</span>
              </div>
              <div className="detail-content">
                <p className="detail-label">Khoa</p>
                <p className="detail-value">{studentData.faculty_id.name}</p>
              </div>
            </div>

            {/* Country */}
            <div className="detail-item">
              <div className="detail-icon orange">
                <span>🇻🇳</span>
              </div>
              <div className="detail-content">
                <p className="detail-label">Quốc gia</p>
                <p className="detail-value">Việt Nam</p>
              </div>
            </div>

            {/* City */}
            <div className="detail-item">
              <div className="detail-icon pink">
                <span>🏙️</span>
              </div>
              <div className="detail-content">
                <p className="detail-label">Tỉnh/Thành phố</p>
                <p className="detail-value">HCM</p>
              </div>
            </div>

            {/* Timezone */}
            <div className="detail-item">
              <div className="detail-icon indigo">
                <span>🕐</span>
              </div>
              <div className="detail-content">
                <p className="detail-label">Múi giờ</p>
                <p className="detail-value">Asia/Ho_Chi_Minh</p>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  )
}

export default ProfileStudent