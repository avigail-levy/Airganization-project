import { useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { useUserContext }from './UserContext';
import fetchData from '../service/FetchData';

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
   if (response.user.length!=0) {
    setCurrentUser(response.user);
    // const idUser = JSON.parse(localStorage.getItem('currentUser'));
    // const redirectTo = location.state?.from;
    // navigate(redirectTo);
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
      <label>alicec</label>
      <br/>
      <label>hashed_pw1</label>
      <br/>
     <label>rinam</label>
     <br/>
     <label>hashed_pw3</label>
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