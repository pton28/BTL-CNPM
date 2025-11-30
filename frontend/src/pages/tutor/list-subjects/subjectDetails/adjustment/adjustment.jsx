import React, { useState, useRef } from 'react';
import './adjustment.scss';

const AddFileModal = ({ isOpen, onClose, onConfirm }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null); // Tạo ref để tham chiếu tới thẻ input ẩn

  if (!isOpen) return null;

  // 1. Xử lý khi người dùng chọn file qua hộp thoại
  const handleFileSelect = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  // 2. Xử lý sự kiện Kéo (Drag)
  const onDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  // 3. Xử lý sự kiện Thả (Drop)
  const onDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  // 4. Hàm kích hoạt input ẩn khi click vào vùng upload
  const handleClickUploadZone = () => {
    fileInputRef.current.click();
  };

  // 5. Hàm gửi dữ liệu ra ngoài khi bấm "Tạo"
  const handleSubmit = () => {
    if (selectedFile) {
        // Truyền file đã chọn ra hàm onConfirm ở cha
        onConfirm(selectedFile); 
        
        // Reset sau khi gửi
        setSelectedFile(null); 
    } else {
        alert("Vui lòng chọn tài liệu trước!");
    }
  };

  const handleCloseLocal = () => {
      setSelectedFile(null);
      onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Thêm tài liệu</h2>
          <span className="close-icon" onClick={handleCloseLocal}>&times;</span>
        </div>

        <div className="modal-body">
          <label className="modal-label">Thêm tài liệu</label>
          <p className="modal-subtext">Kích thước tối đa với một tập tin 100 MB.</p>

          {/* --- VÙNG UPLOAD CHÍNH --- */}
          <div 
            className={`upload-zone ${isDragging ? 'dragging' : ''}`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={handleClickUploadZone} // Click vùng này sẽ mở file dialog
            style={{ cursor: 'pointer', border: isDragging ? '2px dashed #007bff' : '' }}
          >
            {/* Input ẩn để xử lý việc chọn file */}
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileSelect} 
                style={{ display: 'none' }} 
            />

            <div className="file-icon-badge">📄</div>
            
            <div className="upload-content">
              {selectedFile ? (
                  // Giao diện khi ĐÃ chọn file
                  <div className="selected-file-info">
                      <strong>{selectedFile.name}</strong>
                      <p className="file-size">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      <span className="click-to-change">(Click để đổi file khác)</span>
                  </div>
              ) : (
                  // Giao diện khi CHƯA chọn file
                  <>
                    <div className="upload-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    </div>
                    <p>Thêm các tập tin bằng cách <strong>kéo thả</strong> hoặc <strong>nhấn vào đây</strong>.</p>
                  </>
              )}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={handleCloseLocal}>Huỷ</button>
          <button className="btn-create" onClick={handleSubmit}>Tạo</button>
        </div>
      </div>
    </div>
  );
};

export default AddFileModal;