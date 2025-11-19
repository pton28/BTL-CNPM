// src/routes/ProtectedRoute.jsx

import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
// import useAuth from '../context/AuthContext';

/**
 * @param {object} props
 * @param {Array<string>} props.allowedRoles - Array of allowed roles (ex: ['student', 'tutor'])
 */
const ProtectedRoute = ({ allowedRoles }) => {
    // const { user } = useAuth(); // Suppose user object: { id: 1, name: '...', role: 'student' }
    const userStr = localStorage.getItem('user')
    const user = userStr ? JSON.parse(userStr) : null

    const location = useLocation()

    // 1. Login
    if (!user) {
        // If not logged in -> navigate Login page
        return <Navigate to="/pre-login" state={{ from: location }} replace />
    }

    // 2. Validate role
    // If "The route requires a role" and "The user role is not in the allowed list".
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Navigate Unauthorized page
        return <Navigate to="/unauthorized" replace />
    }

    // 3. If everything OK
    return <Outlet />
}

export default ProtectedRoute
