import { createBrowserRouter } from "react-router-dom"

/*
 * Define public routes and private routes
 * Distinguish:
 *   1.  relative path (ex: 'admin')
 *   2.  absolute path (ex: '/admin')
 * */

// Common --------------------------------------------------------------------------
import MainLayout from "../components/MainLayout.jsx";
import PreLogin from "../pages/common/preLogin/PreLogin.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Unauthorized from "../pages/common/unauthorized/Unauthorized.jsx";


// Student --------------------------------------------------------------------------
import MainStudentLayout from "../pages/student/MainStudentLayout.jsx";
import LoginStudent from "../pages/student/login/LoginStudent.jsx";
import HistoryAppointment from "@/pages/student/history/HistoryAppointment.jsx";
import InnerAppointment from "@/pages/student/inner-appointment/InnerAppointment.jsx";

// Tutor ----------------------------------------------------------------------------
import LoginTutor from "@/pages/tutor/login/LoginTutor.jsx";
import ListAppointment from "@/pages/student/list-appointment/ListAppointment.jsx";
import SearchCourse from "@/pages/student/search-course/SearchCourse.jsx";



export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/unauthorized',
                element: <Unauthorized />,
            },
            {
                path: '/pre-login',
                element: <PreLogin />,
            },
            {
                path: '/student/login',
                element: <LoginStudent />
            },
            {
                path: '/tutor/login',
                element: <LoginTutor />,
            },
            { // Route private
                path: 'history',
                element: <HistoryAppointment />
            },
            { // Route private
                path: 'list-appointment/:id',
                element: <InnerAppointment />,
            },
            { // Route private
                path: 'list-appointment',
                element: <ListAppointment />,
            },
            { // Route private
                path: 'search-course',
                element: <SearchCourse />,
            },
            // others public routes
            // ...
            {
                element: <ProtectedRoute />,
                children: [
                    // student
                    {
                        path: '/student',
                        element: <MainStudentLayout />,
                        children: [

                        ]
                    },
                    // tutor
                    {

                    }
                ]
            }
        ]
    }
])

