import { useNavigate,Outlet, } from "react-router-dom";
import { useUserContext } from "../UserContext";


const btnArr = [
  { label: 'לקוחות', path: '/admin/users' },
  { label: 'הזמנות', path: '/admin/orders' }
];
const AdminNavbar = () => {
    return(
         <> 
         {btnArr.map((btn, index) => (
        <button key={index} onClick={() => navigate(btn.path)}>
          {btn.label}
        </button>
      ))}
      </>);
                }
export default AdminNavbar;