import './subjectDetails.scss'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CourseComponent from '@/components/tutor/courseDetail/course/courseComponent.jsx'
import DetailComponent from '@/components/tutor/courseDetail/detail/detailComponent.jsx'
import Button from '@/components/common/ui/button/buttonClickForm/button.jsx'
import AddFile from './adjustment/adjustment.jsx'
import DeleteConfirm from '@/components/common/ui/modal/deleteConfirm.jsx'
import { createNewMaterial, deleteMaterial, updateMaterial } from '@/services/materialService'; 

import { useFetchMeetingById } from '@/services/fetchAPI/useFetchMeetingById'

const SubjectDetails = () => {
   const { id } = useParams()
   // Thêm refresh để reload lại data sau khi Save thành công
   const [refresh, setRefresh] = useState(false);
   const { data: meeting, loading: loadingMeeting } = useFetchMeetingById(refresh, id)

   const [isEditing, setIsEditing] = useState(false)
   const [status, setStatus] = useState('course')
   const [activeSectionId, setActiveSectionId] = useState(null)
   const [deleteModalOpen, setDeleteModalOpen] = useState(false)
   const [itemToDelete, setItemToDelete] = useState(null)
   
   const [sections, setSections] = useState([])
   
   // --- STATE MỚI ĐỂ QUẢN LÝ HOÀN TÁC ---
   const [backupSections, setBackupSections] = useState([]); // Lưu trạng thái cũ
   const [deletedIds, setDeletedIds] = useState([]);         // Lưu các ID cần xoá khi bấm Save

   // 1. Map dữ liệu từ API (Chỉ chạy khi không ở chế độ Edit hoặc khi mới load)
   useEffect(() => {
      if (meeting && !isEditing) {
         const rawData = meeting.materials || meeting.documents || []; 

         if (rawData.length > 0) {
             const groupedData = {};

            rawData.forEach(item => {
               const sectionTitle = item.title; 
               const fileObj = {
                     _id: item._id,          
                     name: item.file,    
                     displayName: item.file ? item.file : item.content,
                     type: item.file ? 'file' : 'text',
                     isNew: false,
                     hasFile: !!item.file
               };

               if (!groupedData[sectionTitle]) {
                  groupedData[sectionTitle] = [];
               }
               groupedData[sectionTitle].push(fileObj);
            });

            const formattedSections = Object.keys(groupedData).map((key, index) => {
               const sortedItems = groupedData[key].sort((a, b) => {
                  if (!a.hasFile && b.hasFile) return -1;
                  if (a.hasFile && !b.hasFile) return 1;
                  return 0;
               });
               return {
                 id: index + 1,
                 title: key,
                 items: sortedItems
               }
            });

             setSections(formattedSections);
         } else {
             setSections([]);
         }
      }
   }, [meeting, isEditing]); // Thêm isEditing để tránh re-render đè dữ liệu đang sửa

   // --- CÁC HÀM LOGIC ---

   const handleEdit = () => {
      // Backup dữ liệu hiện tại
      setBackupSections(JSON.parse(JSON.stringify(sections)));
      setDeletedIds([]); // Reset danh sách xoá chờ
      setIsEditing(true);
   }

   const handleCancel = () => {
      // Khôi phục dữ liệu từ backup
      setSections(backupSections);
      setDeletedIds([]);
      setIsEditing(false);
   }

   // --- LOGIC ADD FILE (SỬA ĐỔI: Không gọi API, chỉ update UI) ---
   const handleConfirmAddFile = (fileData) => {
      if (activeSectionId !== null && fileData){
         
         // Tạo một object tạm (chưa có ID thật từ DB)
         const tempId = `temp-${Date.now()}`;
         const hasFile = !!fileData.file;

         const newFileObj = {
            _id: tempId, 
            name: "#", // Chưa có link server
            displayName: hasFile ? fileData.file.name : fileData.content,
            type: hasFile ? 'file' : 'text',
            fileRaw: fileData.file, // Lưu file gốc để tí nữa Save thì upload
            contentRaw: fileData.content,
            isNew: true // Đánh dấu để biết tí nữa cần Upload
         };

         setSections(prevSections => prevSections.map(sec => {
            if(sec.id === activeSectionId){
               let newItems;
               if (!hasFile) {
                    newItems = [newFileObj, ...sec.items];
                } else {
                    newItems = [...sec.items, newFileObj];
                }
               return{
                  ...sec,
                  items: newItems
               }
            }
            return sec;
         }));

         handleCloseModal();
      }
   }

   // --- LOGIC DELETE (SỬA ĐỔI: Không gọi API, chỉ ẩn khỏi UI) ---
   const handleDeleteClick = (sectionId, materialId) => {
      setItemToDelete({ sectionId, materialId });
      setDeleteModalOpen(true);
   }

   const confirmDelete = () => {
      if (itemToDelete) {
         const { sectionId, materialId } = itemToDelete;

         // Nếu là file cũ (có ID thật từ DB), thêm vào danh sách chờ xoá
         if (!materialId.toString().startsWith('temp-')) {
             setDeletedIds(prev => [...prev, materialId]);
         }

         // Xoá khỏi giao diện (UI)
         setSections(prevSections => 
            prevSections.map(section => {
               if (section.id === sectionId) {
                  return {
                     ...section,
                     items: section.items.filter(item => item._id !== materialId)
                  };
               }
               return section;
            })
         );

         setDeleteModalOpen(false);
         setItemToDelete(null);
      }
   }

   // --- LOGIC SAVE (SỬA ĐỔI: Xử lý tất cả ở đây) ---
   const handleSave = async () => {
      try {
         // 1. Xử lý XOÁ các file trong danh sách chờ
         if (deletedIds.length > 0) {
             const deletePromises = deletedIds.map(id => deleteMaterial(id));
             await Promise.all(deletePromises);
         }

         // 2. Xử lý UPLOAD các file mới & UPDATE Title
         const updatePromises = [];

         for (const section of sections) {
             for (const item of section.items) {
                 
                 // Trường hợp 1: File Mới -> Upload
                 if (item.isNew) {
                     // Upload file mới
                     updatePromises.push(
                        createNewMaterial(section.title, item.fileRaw, item.contentRaw, id)
                     );
                 } 
                 // Trường hợp 2: File Cũ -> Update Title (nếu title section đổi)
                 else if (!item.isNew) {
                     // Chỉ gọi update title để đồng bộ
                     updatePromises.push(
                         updateMaterial(item._id, { title: section.title })
                     );
                 }
             }
         }

         await Promise.all(updatePromises);
         
         alert("Lưu thay đổi thành công!");
         setIsEditing(false);
         setDeletedIds([]);
         setRefresh(prev => !prev); // Trigger reload dữ liệu mới nhất từ Server

      } catch (error) {
         console.error("Lỗi khi lưu:", error);
         alert("Có lỗi xảy ra. Một số thao tác có thể chưa được lưu.");
      }
   }

   // ... Các hàm phụ trợ giữ nguyên ...
   const handleOpenAddModal = sectionId => setActiveSectionId(sectionId);
   const handleCloseModal = () => setActiveSectionId(null);
   const handleAddSection = () => {
      const newSection = {
         id: `temp-section-${Date.now()}`, // ID tạm để React render key
         title: 'Mục mới (Nhập tên...)',    // Tên mặc định
         items: []                          // Chưa có tài liệu nào
      };
      setSections(prev => [...prev, newSection]);
   };
   const handleUpdateTitle = (sectionId, newTitle) => {
      setSections(prevSections => 
         prevSections.map(section => {
            if (section.id === sectionId) {
               return { ...section, title: newTitle };
            }
            return section;
         })
      );
   };

   // Render
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

   return (
      <div className="subject-details-wrapper">
         <div className="subject-details-container">
            {/* Header */}
            <div className="header-section">
               <h1 className="subject-title">
                  {loadingMeeting ? 'Đang tải...' : meeting?.title_meeting || 'Môn học'}
               </h1>
               {!isEditing ? (
                  <button onClick={handleEdit} className="custom-btn-edit">Chỉnh sửa</button>
               ) : (
                  <div className="action-buttons">
                     <button onClick={handleSave} className="custom-btn-save">Lưu</button>
                     <button onClick={handleCancel} className="custom-btn-cancel">Hủy</button>
                  </div>
               )}
            </div>

            {/* Tabs */}
            <div className="tabs-container">
               <Button className={`custom-tab-btn ${status === 'course' ? 'active' : ''}`} onClick={() => setStatus('course')}>Khóa học</Button>
               <Button className={`custom-tab-btn ${status === 'schedule' ? 'active' : ''}`} onClick={() => setStatus('schedule')}>Lịch giảng dạy</Button>
            </div>

            <div className="content-body">{renderContent()}</div>
         </div>

         <AddFile
            isOpen={activeSectionId !== null} 
            onClose={handleCloseModal}
            onConfirm={handleConfirmAddFile}
         />

         <DeleteConfirm
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)} 
            onConfirm={confirmDelete} 
         />
      </div>
   )
}

export default SubjectDetails