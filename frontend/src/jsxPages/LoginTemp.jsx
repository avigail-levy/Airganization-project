import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext }from './UserContext';
import fetchData from '../service/FetchData';

const Login=()=> {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setCurrentUser } = useUserContext();
  
  const btnLogin = async (e) => {
  e.preventDefault(); 
  try{
    const user = await fetchData('users','POST',{username,password});
    console.log(user);
   if (user.length!=0) {
    localStorage.setItem("currentUser",JSON.stringify(user.id));
    setCurrentUser(user);
    const idUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log("id"+idUser);
    navigate(`/users/${idUser}/home`);
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
export default Login