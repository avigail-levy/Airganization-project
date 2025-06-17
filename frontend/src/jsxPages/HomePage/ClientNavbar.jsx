import { useNavigate,Outlet, } from "react-router-dom";
import { useUserContext } from "../UserContext";
const btnArr = [
  { label: 'הזמנות שלי', path: 'myOrders' },
  { label: 'צור קשר', path: 'ContactForm' },
  { label: 'אודות', path: '/admin/orders' }
];
const ClientNavbar = () => {
  const navigate=useNavigate();
    return(
         <> 
        {btnArr.map((btn, index)=> (
          <button key={index} onClick={() =>navigate(btn.path)}>{btn.label}</button>  ))} 
      </>);

      
                }
export default ClientNavbar;