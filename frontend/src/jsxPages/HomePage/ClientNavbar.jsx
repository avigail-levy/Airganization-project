import { useNavigate } from "react-router-dom";
import { useUserContext } from "../UserContext";
import LoginPopup from "../Entry/LoginPopup";
import { useState } from "react";
import ifCurrentUser from "../../service/GlobalFuncs";

const btnArr = [
  { label: 'הזמנות שלי', path: 'myOrders' },
  { label: 'צור קשר', path: 'ContactForm' },
  { label: 'אודות', path: 'about' }
];
const ClientNavbar = () => {
  const navigate=useNavigate();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const { currentUser } = useUserContext();

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