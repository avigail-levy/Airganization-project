import { useNavigate,Outlet, } from "react-router-dom";
import { useUserContext } from "./UserContext";
const btnArr=['דף הבית','חבילות נופש','לקוחות','הזמנות','אודות'];

const AdminNavbar = () => {
    console.log()
    return(
         <> 
        {btnArr.map((index,btn) => (
          <button key={index}>{btn}</button>
        ))} 
      </>);
                }
export default AdminNavbar;