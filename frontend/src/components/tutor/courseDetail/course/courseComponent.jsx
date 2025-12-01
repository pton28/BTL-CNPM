import React from 'react';

const CourseComponent = ({ isEditing, sections, onInsertSection, onAddItem, onDeleteItem, onUpdateTitle }) => {
    return (
        <div className="course-content-wrapper">
            {sections.map((section, index) => (
                <div key={section.id} className="section-wrapper">
                    <div className="section-block">
                        <div className="section-header">
                            <div className="header-left">
                                {/* Icon mũi tên xuống */}
                                <span className="icon-chevron">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                </span>
                                {isEditing ? (
                                    <input 
                                        type="text" 
                                        className="section-title-input"
                                        value={section.title}
                                        onChange={(e) => onUpdateTitle(section.id, e.target.value)}
                                        placeholder="Nhập tên mục..."
                                    />
                                ) : (
                                    <h3>{section.title}</h3>
                                )}
                            </div>
                            
                            {isEditing && (
                                <button 
                                    className="btn-add-item-small" 
                                    onClick={() => onAddItem(section.id)}
                                    title="Thêm tài liệu vào mục này"
                                >
                                    + Thêm tài liệu
                                </button>
                            )}
                        </div>

                        <div className="section-items">
                            {section.items.map((item, itemIndex) => (
                                <div key={itemIndex} className="item-row">
                                    <div className="item-content" style={{ display: 'flex', alignItems: 'center' }}>
                                        {item.type !== 'text' && (
                                            <span className="icon-folder" style={{ marginRight: '10px' }}>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="#333" stroke="currentColor" strokeWidth="0">
                                                    <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path>
                                                </svg>
                                            </span>
                                        )}

                                        {item.type === 'text' ? (
                                            <span className="item-text">
                                                {item.displayName || item.content}
                                            </span>
                                        ) : (
                                            <a 
                                                href={`http://localhost:8000/uploads/${item.name}`} 
                                                target="_blank" 
                                                rel="noreferrer" 
                                                className="item-link"
                                            >
                                                {item.displayName || item.name}
                                            </a>
                                        )}
                                    </div>

                                    {isEditing && (
                                        <button 
                                            className="btn-delete-item" 
                                            onClick={() => onDeleteItem(section.id, item._id)}
                                        >
                                            🗑️ 
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
            {isEditing && (
                <button className="btn-add-section-bottom" onClick={onInsertSection}>
                    + Thêm mục mới tại đây
                </button>
            )}
        </div>
    );
};

export default CourseComponent;