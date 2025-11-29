import './subjectDetails.scss'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import CourseComponent from '@/components/tutor/courseDetail/course/courseComponent.jsx'
import DetailComponent from '@/components/tutor/courseDetail/detail/detailComponent.jsx'
import Button from '@/components/common/ui/button/buttonClickForm/button.jsx'
import AddFile from './adjustment/adjustment.jsx' // Sửa đường dẫn cho đúng với dự án của bạn
import DeleteConfirm from '@/components/common/ui/modal/deleteConfirm.jsx'

import { useFetchMeetingById } from '@/services/fetchAPI/useFetchMeetingById'

const SubjectDetails = () => {
   const { id } = useParams()
   console.log(id)
   const { data: meeting, loading: loadingMeeting } = useFetchMeetingById(id, id)
   console.log(meeting)

   const [isEditing, setIsEditing] = useState(false)
   const [status, setStatus] = useState('course')
   const [activeSectionId, setActiveSectionId] = useState(null)
   const [deleteModalOpen, setDeleteModalOpen] = useState(false)
   const [itemToDelete, setItemToDelete] = useState(null)
   const [sections, setSections] = useState([
      {
         id: 1,
         title: 'Chung',
         items: ['Kỹ năng Chuyên nghiệp cho Kỹ sư (CO2001)_VideoURL', 'Đề cương môn học'],
      },
      {
         id: 2,
         title: 'Tài liệu',
         items: ['Bài giảng tuần 1', 'Bài tập lớn'],
      },
   ])

   // Hàm mở modal (được truyền xuống CourseComponent)
   const handleOpenAddModal = sectionId => {
      setActiveSectionId(sectionId)
   }

   // Hàm đóng modal
   const handleCloseModal = () => {
      setActiveSectionId(null)
   }

   // Hàm xử lý khi ấn nút "Tạo" trong Modal
   const handleConfirmAddFile = () => {
      if (activeSectionId !== null) {
         // Logic thêm file vào section tương ứng
         setSections(
            sections.map(section => {
               if (section.id === activeSectionId) {
                  return { ...section, items: [...section.items, 'Tài liệu chưa có tiêu đề'] }
               }
               return section
            })
         )

         // Đóng modal sau khi tạo xong
         handleCloseModal()
      }
   }

   const handleEdit = () => {
      setIsEditing(true)
   }

   const handleSave = () => {
      setIsEditing(false)
      // Xử lý lưu dữ liệu ở đây
      console.log('Đã lưu thay đổi')
   }

   const handleCancel = () => {
      setIsEditing(false)
      // Reset về dữ liệu ban đầu nếu cần
      console.log('Đã hủy thay đổi')
   }

   const handleAddSection = () => {
      const newSection = {
         id: Date.now(), // Dùng timestamp để tránh trùng id
         title: 'Mục mới (Click để sửa tên)',
         items: [],
      }
      setSections([...sections, newSection])
      console.log('Đã thêm section mới', newSection)
   }

   const handleUpdateTitle = (sectionId, newTitle) => {
      setSections(
         sections.map(section => {
            if (section.id === sectionId) {
               return { ...section, title: newTitle }
            }
            return section
         })
      )
   }

   const handleDeleteClick = (sectionId, itemIndex) => {
      setItemToDelete({ sectionId, itemIndex })
      setDeleteModalOpen(true)
   }

   const confirmDelete = () => {
      if (itemToDelete) {
         const { sectionId, itemIndex } = itemToDelete

         // Logic xóa cũ của bạn
         setSections(
            sections.map(section => {
               if (section.id === sectionId) {
                  return {
                     ...section,
                     items: section.items.filter((_, index) => index !== itemIndex),
                  }
               }
               return section
            })
         )

         // Đóng modal và reset
         setDeleteModalOpen(false)
         setItemToDelete(null)
      }
   }

   const handleAddItem = sectionId => {
      setSections(
         sections.map(section => {
            if (section.id === sectionId) {
               return { ...section, items: [...section.items, 'Tài liệu mới'] }
            }
            return section
         })
      )
   }

   const handleDeleteItem = (sectionId, itemIndex) => {
      setSections(
         sections.map(section => {
            if (section.id === sectionId) {
               return {
                  ...section,
                  items: section.items.filter((_, index) => index !== itemIndex),
               }
            }
            return section
         })
      )
   }

   const renderContent = () => {
      switch (status) {
         case 'course':
            return (
               <CourseComponent
                  isEditing={isEditing}
                  sections={sections}
                  onInsertSection={handleAddSection}
                  onAddItem={handleOpenAddModal}
                  onDeleteItem={handleDeleteClick}
                  onUpdateTitle={handleUpdateTitle}
               />
            )
         case 'schedule':
            return <DetailComponent />
         default:
            return <CourseComponent />
      }
   }

   const editButtonClassName = `custom-btn-edit ${status === 'schedule' ? 'hidden' : ''}`

   return (
      <div className="subject-details-wrapper">
         <div className="subject-details-container">
            <div className="header-section">
               <h1 className="subject-title">
                  {loadingMeeting
                     ? 'Đang tải...'
                     : meeting && meeting.title_meeting
                       ? meeting.title_meeting
                       : 'Môn học không tồn tại'}
               </h1>
               {!isEditing ? (
                  <button onClick={handleEdit} className="custom-btn-edit">
                     Chỉnh sửa
                  </button>
               ) : (
                  <div className="action-buttons">
                     <button onClick={handleSave} className="custom-btn-save">
                        Lưu
                     </button>
                     <button onClick={handleCancel} className="custom-btn-cancel">
                        Hủy
                     </button>
                  </div>
               )}
            </div>

            <div className="tabs-container">
               <Button
                  className={`custom-tab-btn ${status === 'course' ? 'active' : ''}`}
                  onClick={() => setStatus('course')}
               >
                  Khóa học
               </Button>

               <Button
                  className={`custom-tab-btn ${status === 'schedule' ? 'active' : ''}`}
                  onClick={() => setStatus('schedule')}
               >
                  Lịch giảng dạy
               </Button>
            </div>

            <div className="content-body">{renderContent()}</div>
         </div>

         <AddFile
            isOpen={activeSectionId !== null} // Mở khi có ID section active
            onClose={handleCloseModal}
            onConfirm={handleConfirmAddFile}
         />

         <DeleteConfirm
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)} // Đóng khi bấm Hủy
            onConfirm={confirmDelete} // Xóa khi bấm xác nhận
         />
      </div>
   )
}

export default SubjectDetails