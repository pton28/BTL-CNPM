import { createBrowserRouter, Navigate } from 'react-router-dom'

// Common --------------------------------------------------------------------------
import MainLayout from '@/components/MainLayout.jsx'
import PreLogin from '@/pages/common/preLogin/PreLogin.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import Unauthorized from '@/pages/common/unauthorized/Unauthorized.jsx'

// Student --------------------------------------------------------------------------
import LoginStudent from '@/pages/student/login/LoginStudent.jsx'
import HistoryAppointment from '@/pages/student/history/HistoryAppointment.jsx'
import InnerAppointment from '@/pages/student/inner-appointment/InnerAppointment.jsx'
import ListAppointment from '@/pages/student/list-appointment/ListAppointment.jsx'
import SearchCourse from '@/pages/student/search-course/SearchCourse.jsx'

// Tutor ----------------------------------------------------------------------------
import LoginTutor from '@/pages/tutor/login/LoginTutor.jsx'
import ListSubjects from '@/pages/tutor/list-subjects/listSubjects.jsx'
import SubjectDetails from '@/pages/tutor/list-subjects/subjectDetails/subjectDetails.jsx'
import OpenClass from '@/pages/tutor/open-class/OpenClass.jsx'
import ProfileStudent from '@/pages/student/profile/Profile.jsx'

export const router = createBrowserRouter([
   {
      path: '/',
      element: <MainLayout />,
      children: [
         { path: 'pre-login', element: <PreLogin /> },
         { path: 'unauthorized', element: <Unauthorized /> },
         { path: 'student/login', element: <LoginStudent /> },
         { path: 'tutor/login', element: <LoginTutor /> },

         {
            element: <ProtectedRoute allowedRoles={['student']} />,
            children: [
               {
                  path: '/student',
                  children: [
                     { index: true, element: <Navigate to="search-course" replace /> },

                     { path: 'search-course', element: <SearchCourse /> },

                     { path: 'list-appointment', element: <ListAppointment /> },

                     { path: 'list-appointment/:id', element: <InnerAppointment /> },

                     { path: 'history', element: <HistoryAppointment /> },

                     {path: 'profile', element: <ProfileStudent />}
                  ],
               },
            ],
         },
         {
            element: <ProtectedRoute allowedRoles={['tutor']} />,
            children: [
               {
                  path: '/tutor',
                  children: [
                     { index: true, element: <Navigate to="list-subjects" replace /> },

                     { path: 'list-subjects', element: <ListSubjects /> },

                     { path: 'subject-details/:id', element: <SubjectDetails /> },

                     { path: 'open-class', element: <OpenClass /> },
                  ],
               },
            ],
         },
      ],
   },
])
