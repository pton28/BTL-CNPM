import './App.css'
import {router} from "./routes/AppRoute.jsx"
import { RouterProvider } from 'react-router-dom'

function App() {
    return <RouterProvider router={router} />
}

export default App
