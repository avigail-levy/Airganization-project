import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from "../App.jsx";
import  { UserProvider } from "./UserContext";
import Home from './HomePage/Home.jsx';
import Login from "./Login.jsx";
import Users from './Users/Users.jsx';
import Orders from './Orders.jsx';
import VacationPackages from './VacationPackages.jsx';
import Profile from './Profile.jsx';
import Trips from './Trips.jsx';
import Register from './Register.jsx';
import AddManager from './Users/AddManager.jsx';
import VacationPackagesDetails from './VacationPackageDetails.jsx';
import VacationOrder from './VacationOrder.jsx';
import ContactForm from "./ContactForm.jsx";
import AddUpdateVacation from './AddUpdateVacation.jsx';
import About from './About.jsx';
const router = createBrowserRouter([
    {
        path: '/',
        element: <UserProvider> <App /> </UserProvider>    ,
        children: [
            { path: '/', element: <Navigate to="/home" replace /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
      {
        path: 'home/',
        element: <Home />,
        children: [
          { path: 'admin/users', element: <Users />, 
            children:[{path:':users', element:<AddManager />}]
          },
          {path:'about', element:<About/>},
          { path:'admin/orders', element: <Orders /> },
          { path:'vacationPackages', element: <VacationPackages/>},
          {path:'myOrders', element:<Orders/>},
          {path:'vacationPackages/add', element:<AddUpdateVacation/>},
          {path:'ContactForm', element:<ContactForm/>},
          {path:'vacationPackages/:vacationId', element:<AddUpdateVacation/>},
          {path:'vacationPackages/:vacationId/order', element:<VacationOrder/>},
             {path:'vacationDetails/:vacationId', element:<VacationPackagesDetails/>,
              children:[
                {path:'trips', element:<Trips/>}
                ]
              },

          { path: 'profile', element:<Profile/>},
          {path:'update',element:<Register/>}
        ]
      },
       {path:'*', element:<Navigate to="/login"/>}
        ]
    }
]);
export default router;