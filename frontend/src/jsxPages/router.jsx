import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from "../App.jsx";
import  { UserProvider } from "./UserContext";
import Home from './HomePage/Home.jsx';
import Login from "./LoginTemp.jsx";
import Users from './Users.jsx';
import Orders from './Orders.jsx';
import VacationPackages from './VacationPackages.jsx';
import Profile from './Profile.jsx';
const router = createBrowserRouter([
    {
        path: '/',
        element: <UserProvider> <App /> </UserProvider>    ,
        children: [
            { path: '/', element: <Navigate to="/login" replace /> },
            { path: 'login', element: <Login /> },
      {
        path: 'users/:id/home/',
        element: <Home />,
        children: [
          { path: 'admin/users', element: <Users /> },
          { path: 'admin/orders', element: <Orders /> },
          { path: 'vacationPackages', element: <VacationPackages/>},
          { path: 'profile', element:<Profile/>}
        ]
      },
       {path:'*', element:<Navigate to="/login"/>}
        ]
    }
]);
export default router;

