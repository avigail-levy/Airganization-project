import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import fetchData from "../service/FetchData";
import { useUserContext } from "./UserContext";

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState('');
    const {currentUser, setCurrentUser } = useUserContext();
    const [valuesInput, setValuesInput] = useState({
        name: currentUser.name||'',
        username: '',
        phone: '',
        email: '',
        role: location.state?.role || 'customer',
        password: ''
    });

    const validateValues = () => {
        if (valuesInput.username.length < 3) {
            setError("שם משתמש חייב להכיל לפחות 3 תווים");
            return false;
        }
        if (!/^\d{9,10}$/.test(valuesInput.phone)) {
            setError("מספר טלפון חייב להכיל 9 או 10 ספרות");
            return false;
        }
        if (valuesInput.password.length < 6) {
            setError("סיסמה חייבת להכיל לפחות 6 תווים");
            return false;
        }
        if (!valuesInput.email.includes('@')) {
            setError("כתובת אימייל לא תקינה");
            return false;
        }
        return true;
    };
    const Register = async (e) => {
        e.preventDefault();
        setError('');
        if (!validateValues()) return;
        try {
            const response = await fetchData(`users/register`, 'POST', valuesInput );
            console.log('response', response);
            if(location.state?.role==='customer')
            {
                localStorage.setItem('token', response.token);
                setCurrentUser(response.user);
            }
            
            alert('נרשם בהצלחה!');
            if(location.state?.role==='manager')
            {
                navigate('/users');
            }
            else{navigate('/home');}
            
        } catch (error) {
            console.error('Signup error:', error);
            setError("שדה אחד או יותר לא תקינים, אנא נסה שוב");
        }
    };

    const updateCurrentValues = (e) => {
        setValuesInput({ ...valuesInput, [e.target.name]: e.target.value });
    };

    return (
        <div>
           
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            {
  location.state?.role === 'manager' ? (
    <h1 style={{ color: 'blue', fontWeight: 'bold', marginBottom: '1rem' }}>רישום מנהל חדש</h1>)
      : (<h1 style={{ color: 'green', fontWeight: 'bold', marginBottom: '1rem' }}>הרשמה</h1>)}
            <form onSubmit={Register} style={{ direction: 'rtl' }}>
                <br />
                <label htmlFor="name">שם:</label>
                <input type="text" id="name" name="name" onChange={(e) => updateCurrentValues(e)} required />
                <br />
                <label htmlFor="username">שם משתמש:</label>
                <input type="text" id="username" name="username" onChange={(e) => updateCurrentValues(e)} required />
                <br />
                <label htmlFor="password">סיסמא:</label>
                <input type="password" id="password" name="password" onChange={(e) => updateCurrentValues(e)} required />
                <br />
                <label htmlFor="phone">טלפון:</label>
                <input type="tel" id="phone" name="phone" onChange={(e) => updateCurrentValues(e)} required />
                <br />
                <label htmlFor="email">כתובת אימייל:</label>
                <input type="email" id="email" name="email" onChange={(e) => updateCurrentValues(e)} required />
                <br />
                { currentUser ?<button type="button" onClick={updateUser}>עדכון</button> 
                : <button type="submit"> הרשמה</button>}
            </form>
        </div>
    );
};

export default Register;
      
    