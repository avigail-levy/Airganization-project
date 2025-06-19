import { useNavigate,Outlet, } from "react-router-dom";
import { useUserContext } from "../UserContext";
import AdminNavbar from './AdminNavbar';
import ClientNavbar from './ClientNavbar';
import { useState } from "react";
import LoginPopup from "../LoginPopup";
import ifCurrentUser from "../../service/GlobalFuncss";
import '../css/Home.css'

const Home = () => {
    const navigate = useNavigate();
    const [showLoginPopup, setShowLoginPopup] = useState(false);
        const { currentUser } = useUserContext();

    const navBtnArr = [
  { label: currentUser ? currentUser.name.charAt(0) : '👤', path: 'profile' },
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
           {currentUser && <h2>שלום {currentUser.name}</h2>}
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
               {showLoginPopup && <LoginPopup onClose={() => setShowLoginPopup(false)} />}
                <Outlet />   
         </>);}
export default Home