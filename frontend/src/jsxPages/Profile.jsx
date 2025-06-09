import { useNavigate } from "react-router-dom";
import { useUserContext } from "./UserContext";
const profile = () => {
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
    return (
        <>
    <h1>פרופיל אישי</h1>
       <button onClick={btnLogout}>התנתק</button>
       </>
    );
};
export default profile