import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getCurrentUser } from '@/services/auth.services';

/**
 * @param {object} props
 * @param {Array<string>} props.allowedRoles - Array of allowed roles (ex: ['student', 'tutor'])
 */
const ProtectedRoute = ({ allowedRoles }) => {
   const user = getCurrentUser(); // ✅ Lấy user từ token
   const location = useLocation();

   // 1. Kiểm tra đăng nhập
   if (!user) {
      return <Navigate to="/pre-login" state={{ from: location }} replace />;
   }
   
   // 2. Kiểm tra quyền
   if (allowedRoles && !allowedRoles.includes(user.role)) {
      return <Navigate to="/unauthorized" replace />;
   }

   // 3. OK - cho phép truy cập
   return <Outlet />;
};

export default ProtectedRoute;