import { useNavigate,Outlet, } from "react-router-dom";
import { useUserContext } from "../UserContext";
import AdminNavbar from './AdminNavbar';
import ClientNavbar from './ClientNavbar'
const navBtnArr = [
  { label: 'דף הבית', path: '' },
  { label: 'חבילות נופש', path: 'vacationPackages' },
  { label:'פרופיל אישי' ,path:'profile'}
];
const Home = () => {
  
    const navigate = useNavigate();
    const { currentUser } = useUserContext();
    
    return(
         <>
            <h2>hi {currentUser.name}</h2>
                  {navBtnArr.map((btn, index) => (
             <button key={index} onClick={() => navigate(btn.path)}> {btn.label} </button> ))}  
               {currentUser.role === 'manager' ? <AdminNavbar /> : <ClientNavbar />}
                <Outlet />   
         </>);}
export default Home