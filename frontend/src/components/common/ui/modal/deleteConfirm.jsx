import React from 'react';
import './deleteConfirm.scss';

const DeleteConfirm = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal-container">
        
        {/* Tiêu đề */}
        <h3 className="delete-modal-title">Thông báo xoá</h3>
        
        {/* Nội dung thông báo */}
        <div className="delete-modal-content">
           <p>Bạn có chắc chắn muốn xóa tài liệu này không?</p>
           {/* Nếu muốn giống hệt ảnh là hiện thông báo thành công sau khi xóa, 
               bạn có thể đổi text này, nhưng logic chuẩn UX là hỏi trước khi xóa */}
        </div>

        {/* Nút bấm */}
        <div className="delete-modal-actions">
           {/* Nút Hủy (Style giống trong ảnh) */}
          <button className="btn-cancel" onClick={onClose}>Huỷ</button>
          
          {/* Nút Xóa thật (Thêm nút này để xác nhận) */}
          <button className="btn-confirm" onClick={onConfirm}>Xóa</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirm;