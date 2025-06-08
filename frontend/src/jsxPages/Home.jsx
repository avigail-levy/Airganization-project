import { useNavigate,Outlet, } from "react-router-dom";
import { useUserContext } from "./UserContext";
const Home = () => {
    const navigate = useNavigate();
    const { currentUser,setCurrentUser } = useUserContext();
  
    const btnLogout = () => {
         setCurrentUser(null);
         localStorage.removeItem("currentUser");
         navigate('/login');
      };
      if(!currentUser){
        return null;
      }
    return(
         <>
            <h2>hi {currentUser.name}</h2>
                <button onClick={btnLogout}>Logout</button>
                
                <Outlet />   
         </>);}
export default Home