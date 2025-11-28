import React from 'react';
import './adjustment.scss'; // Chúng ta sẽ tạo file này ở bước 2

const AddFileModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Header Xanh */}
        <div className="modal-header">
          <h2>Thêm tài liệu</h2>
          <span className="close-icon" onClick={onClose}>&times;</span>
        </div>

        {/* Body Trắng */}
        <div className="modal-body">
          <label className="modal-label">Thêm tài liệu</label>
          <p className="modal-subtext">Kích thước tối đa với một tập tin 100 MB.</p>

          {/* Vùng Drag & Drop */}
          <div className="upload-zone">
            {/* Icon File nhỏ góc trái */}
            <div className="file-icon-badge">📄</div>
            
            <div className="upload-content">
              <div className="upload-icon">
                 {/* Icon Upload mũi tên lên */}
                 <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
              </div>
              <p>Thêm các tập tin bằng cách kéo thả.</p>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Huỷ</button>
          <button className="btn-create" onClick={onConfirm}>Tạo</button>
        </div>
      </div>
    </div>
  );
};

export default AddFileModal;