import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from "../App.jsx";
import { UserProvider } from "./UserContext.jsx";
import Home from './HomePage/Home.jsx';
import Login from "./Entry/Login.jsx";
import Users from './Users/Users.jsx';
import Orders from './Orders/Orders.jsx';
import VacationPackages from './Vacations/VacationPackages.jsx';
import Profile from './HomePage/Profile.jsx';
import Register from './Entry/Register.jsx';
import AddManager from './Users/AddManager.jsx';
import VacationPackagesDetails from './Vacations/VacationPackageDetails.jsx';
import AddUpdateVacationOrder from './Orders/AddUpdateVacationOrder.jsx';
import ContactForm from "./HomePage/ContactForm.jsx";
import AddUpdateVacation from './Vacations/AddUpdateVacation.jsx';
import About from './HomePage/About.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <UserProvider> <App /> </UserProvider>,
    children: [
      { path: '/', element: <Navigate to="/home" replace /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      {
        path: 'home/',
        element: <Home />,
        children: [
          { index: true, element: <VacationPackages isHomePage={true} /> },
          {
            path: 'admin/users', element: <Users />,
            children: [{ path: ':users', element: <AddManager /> }]
          },
          { path: 'about', element: <About /> },
          { path: 'admin/orders', element: <Orders /> },
          { path: 'vacationPackages', element: <VacationPackages isHomePage={false} /> },
          { path: 'myOrders', element: <Orders /> },
          { path: 'vacationPackages/add', element: <AddUpdateVacation /> },
          { path: 'ContactForm', element: <ContactForm /> },
          { path: 'vacationPackages/update', element: <AddUpdateVacation /> },
          { path: 'vacationPackages/order', element: <AddUpdateVacationOrder /> },
          { path: 'order/update', element: <AddUpdateVacationOrder /> },
          { path: 'vacationDetails', element: <VacationPackagesDetails />},
          { path: 'profile', element: <Profile /> },
          { path: 'update', element: <Register /> }
        ]
      },
      { path: '*', element: <Navigate to="/home" /> }
    ]
  }
]);
export default router;