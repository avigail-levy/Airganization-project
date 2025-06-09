import { useNavigate,Outlet, } from "react-router-dom";
import { useUserContext } from "../UserContext";
const btnArr=['הזמנות שלי','אודות','צור קשר'];

const ClientNavbar = () => {
    return(
         <> 
        {btnArr.map((index,btn) => (
          <button key={index}>{btn}</button>
        ))} 
      </>);
                }
export default ClientNavbar;