import { useNavigate,Outlet, } from "react-router-dom";
import { useUserContext } from "../UserContext";
import AdminNavbar from './AdminNavbar';
import ClientNavbar from './ClientNavbar';
import { useState } from "react";
import LoginPopup from "../LoginPopup";
import ifCurrentUser from "../../service/GlobalFuncs";
import '../css/Home.css'
import VacationPackages from "../VacationPackages";
import { UserIcon } from '@heroicons/react/24/outline';


const Home = () => {
    const navigate = useNavigate();
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const { currentUser } = useUserContext();

  const navBtnArr = [
  { 
  label:currentUser?.name?.charAt(0) ??
    (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>), 
  path: 'profile' 
},
  { label: 'דף הבית', path: '' },
  { label: 'חבילות נופש', path: 'vacationPackages' }];
  
  // const clickNavbar =(path) =>{
  //   if (!currentUser) {
  //    console.log("click");
  //    console.log('currentUser',currentUser);
  //    setShowLoginPopup(true);
  //  } 
  // else {
  //   navigate(path)
  //  }
  // };
    return(
         <>
           <div className="navbar">
                  {navBtnArr.map((btn, index) => (
             <button key={index} 
             className={btn.path === 'profile' ? 'nav-btn profile-btn' : 'nav-btn'}
             onClick={() => {
            if (btn.path === 'profile') {
            ifCurrentUser(currentUser, navigate, setShowLoginPopup, btn.path);} 
            else {
            navigate(btn.path); }
          }}> {btn.label} </button> ))}  
               {currentUser && currentUser.role === 'manager' ? <AdminNavbar /> : <ClientNavbar />}
               </div>
               <div>
              </div>
              <img src="http://localhost:3000/images/logo.png" alt="לוגו האתר" style={{ width: "100px" }} />
               {showLoginPopup && <LoginPopup onClose={() => setShowLoginPopup(false)} />}
                <Outlet />   
         </>);}
export default Home