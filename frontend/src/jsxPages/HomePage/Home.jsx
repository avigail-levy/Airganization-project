import { useNavigate,Outlet, } from "react-router-dom";
import { useUserContext } from "../UserContext";
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
                <Outlet />   
         </>);}
export default Home