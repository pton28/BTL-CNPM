import MainLayout from "../components/MainLayout.jsx";
import PreLogin from "../pages/common/preLogin/PreLogin.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import MainStudentLayout from "../pages/student/MainStudentLayout.jsx";
import LoginStudent from "../pages/student/login/LoginStudent.jsx";
import Unauthorized from "../pages/common/unauthorized/Unauthorized.jsx";


/*
* Define public routes and private routes
* Distinguish:
*   1.  relative path (ex: 'admin')
*   2.  absolute path (ex: '/admin')
* */
import { createBrowserRouter } from "react-router-dom"
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
                            {
                                path: 'login',
                                element: <LoginStudent />
                            }
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

