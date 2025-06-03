import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from "../App.jsx";
import Login from "./login.jsx";
import  UserProvider  from "./UserContext";
const router = createBrowserRouter([
    {
        path: '/',
        element: <UserProvider> <App /> </UserProvider>    ,
        children: [
            { path: '/', element: <Navigate to="/login" replace /> },
            { path: 'login', element: <Login /> },
            { path: 'users/:id/', element: <Home />},
            {path:'*', element:<Navigate to="/login"/>}
        ]
    }
]);
export default router;

