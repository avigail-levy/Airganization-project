import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from "../App.jsx";
import  { UserProvider } from "./UserContext";
import Home from './Home.jsx'; 
import Login from "./LoginTemp.jsx";
const router = createBrowserRouter([
    {
        path: '/',
        element: <UserProvider> <App /> </UserProvider>    ,
        children: [
            { path: '/', element: <Navigate to="/login" replace /> },
            { path: 'login', element: <Login /> },
            { path: 'users/:id/home', element: <Home />},
            {path:'*', element:<Navigate to="/login"/>}
        ]
    }
]);
export default router;

