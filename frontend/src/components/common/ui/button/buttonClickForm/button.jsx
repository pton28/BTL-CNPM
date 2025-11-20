import React from 'react'
import './Button.scss'

const Button = ({ children, onClick, className = '', type = 'button', disabled = false }) => {
   return (
      <button
         type={type}
         className={`common-btn ${className}`} // Kết hợp class chung và class riêng
         onClick={onClick}
         disabled={disabled}
      >
         {children}
      </button>
   )
}

export default Button
