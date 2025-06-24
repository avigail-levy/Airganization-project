import { useNavigate } from "react-router-dom";
import { useUserContext } from "../UserContext";

const Profile = () => {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useUserContext();

    const btnLogout = () => {
        setCurrentUser(null);
        localStorage.removeItem("token");
        navigate('/home');
    };

    const btnUpdate = () => {
        navigate('/home/update', { state: { isUpdate: true } });
    };


    if (!currentUser) {
     //   setCurrentUser({});
        return null;
    }

    return (
        <>
            <h1>פרופיל אישי</h1>
            <div style={{ direction: 'rtl' }}>
                <p><strong>שם:</strong> {currentUser.name}</p>
                <p><strong>שם משתמש:</strong> {currentUser.user_name}</p>
                <p><strong>טלפון:</strong> {currentUser.phone}</p>
                <p><strong>כתובת אימייל:</strong> {currentUser.email}</p>
            </div>

            <br />
            <button onClick={btnLogout}>התנתק</button>
            <button onClick={btnUpdate}>עדכן פרטים</button>
        </>
    );
};

export default Profile;