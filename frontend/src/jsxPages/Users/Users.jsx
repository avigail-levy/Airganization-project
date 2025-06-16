import { useEffect, useState } from "react";
import fetchData from "../../service/FetchData";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../UserContext";
import '../css/Users.css'; 

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useUserContext();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await fetchData('users');
      setUsers(response);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddAdmin = () => {
    navigate('/register', { state: { role: 'manager' } });
  };

  return (
    <div className="users-page">
      <h2>רשימת לקוחות</h2>
      <div className="users-grid">
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            <h3>{user.name}</h3>
            <p><strong>שם משתמש:</strong> {user.user_name}</p>
            <p><strong>טלפון:</strong> {user.phone}</p>
            <p><strong>אימייל:</strong> {user.email}</p>
            <p><strong>תפקיד:</strong> {user.role === 'manager' ? 'מנהל' : 'לקוח'}</p>
          </div>
        ))}
      </div>

      {currentUser?.role === 'manager' && (
        <button className="add-btn" onClick={handleAddAdmin}>➕ הוספת מנהל</button>
      )}
    </div>
  );
};

export default Users;
