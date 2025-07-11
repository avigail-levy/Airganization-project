import { useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { useUserContext }from '../UserContext';
import fetchData from '../../service/FetchData';

const Login=()=> {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentUser } = useUserContext();
  
  const btnLogin = async (e) => {
  e.preventDefault(); 
  try{
    const response = await fetchData('users/login','POST',{username,password});
     if (response.token) {
      localStorage.setItem("token", response.token); // שמירת הטוקן
     }
   if (response.user) {
    setCurrentUser(response.user);
     navigate(`/home`);
  } 
  else {
    alert('שם משתמש או סיסמה שגויים');
  }
}
catch (error) {
  console.error("Error fetching user:", error);
  alert("אירעה שגיאה בטעינת המשתמש");
}
};
  return (
    <div>
      <h1>Login</h1> 
      <form onSubmit={btnLogin}>
      <input type="text" placeholder="Username" value={username} required 
              onChange={(e) => setUsername(e.target.value)}/>
      <br/>
      <input type="password"  placeholder="Password"  value={password} required 
              onChange={(e) => setPassword(e.target.value)}  />
      <br/>
      <button>Login</button>
      <button type='button' onClick={() => navigate('/register')}>Register</button>
      </form>
    </div>
  );
}

export default Login;