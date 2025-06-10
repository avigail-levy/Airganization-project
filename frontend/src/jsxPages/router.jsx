import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from "../App.jsx";
import  { UserProvider } from "./UserContext";
import Home from './HomePage/Home.jsx';
import Login from "./Login.jsx";
import Users from './Users.jsx';
import Orders from './Orders.jsx';
import VacationPackages from './VacationPackages.jsx';
import Profile from './Profile.jsx';
import Trips from './Trips.jsx';
const router = createBrowserRouter([
    {
        path: '/',
        element: <UserProvider> <App /> </UserProvider>    ,
        children: [
            { path: '/', element: <Navigate to="/login" replace /> },
            { path: 'login', element: <Login /> },
      {
        path: 'home/',
        element: <Home />,
        children: [
          { path: 'admin/users', element: <Users /> },
          { path: 'admin/orders', element: <Orders /> },
          { path: 'vacationPackages', element: <VacationPackages/>,
            children: [
             { path:':vacationId/trips', element:<Trips/>} 
            ]
          },
          { path: 'profile', element:<Profile/>}
        ]
      },
       {path:'*', element:<Navigate to="/login"/>}
        ]
    }
]);
export default router;

