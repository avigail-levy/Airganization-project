import { useNavigate,Outlet } from "react-router-dom";
import { useUserContext } from "../UserContext";
import LoginPopup from "../LoginPopup";
import { useState } from "react";
import ifCurrentUser from "../../service/GlobalFuncss";

const btnArr = [
  { label: 'הזמנות שלי', path: 'myOrders' },
  { label: 'צור קשר', path: 'ContactForm' },
  { label: 'אודות', path: 'about' }
];
const ClientNavbar = () => {
  const navigate=useNavigate();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const { currentUser } = useUserContext();
  //  const clickNavbar =(path) =>{
  //    if (!currentUser) {
  //     console.log("click");
  //     console.log('currentUser',currentUser);
  //     setShowLoginPopup(true);
      
  //   } 
  //  else {
  //    navigate(path)
  //   }
  // };

    return(
         <> 
        {btnArr.map((btn, index)=> (
          <button key={index} 
          className="nav-btn"
          onClick={() => {
            if (btn.path === 'myOrders') {
            ifCurrentUser(currentUser, navigate, setShowLoginPopup, btn.path);} 
            else {
            navigate(btn.path); }
          }}>{btn.label}</button>  ))} 
       {showLoginPopup && <LoginPopup onClose={() => setShowLoginPopup(false)} />}
      </>);
};
export default ClientNavbar;