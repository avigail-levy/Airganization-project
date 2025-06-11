import { Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import fetchData from "../service/FetchData";

const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [valuesInput,setValuesInput] = useState({
        id: '',
        name:'',
        username: '',
        phone:'',
        email:'',
        role:'',
        password: ''
    })

    const validateValues = () => {

        if (valuesInput.id.length !== 9) {
            setError("תעודת זהות חייבת להכיל 9 ספרות");
            return false;
        }
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
    }

    const Register = async(e) => {
        e.preventDefault()        
        setError('');
        if (!validateValues()) return;
        try {
            const response = await fetchData(`users/register`, 'POST', {
                id: valuesInput.id, 
                name: valuesInput.name,
                username: valuesInput.username, 
                phone: valuesInput.phone,
                email: valuesInput.email,
                role: 'customer',
                password: valuesInput.password,
                // isActive: true
            });

            localStorage.setItem('token', response.token);
            alert('נרשמת בהצלחה!');
            navigate('/home');
        } catch (error) {
            console.error('Signup error:', error);
            setError("שדה אחד או יותר לא תקינים, אנא נסה שוב");
        }
    }
    const updateCurrentValues = (e) => {
        setValuesInput({...valuesInput,[e.target.name]: e.target.value})
    }
                           
        return (
        <div>
            <>
            <h1>Register</h1>
            <form onSubmit={Register}>
                <label htmlFor="id">תעודת זהות:</label>
                <input type="text" id="id" name="id" 
                        onChange={(e) => updateCurrentValues(e)} required/>
                <br/>
                <label htmlFor="name">שם </label>
                <input type="text" id="name" name="name" 
                        onChange={(e) => updateCurrentValues(e)} required/>
                <br/>
                <label htmlFor="username">שם משתמש</label>
                <input type="text" id="username" name="username" 
                        onChange={(e) => updateCurrentValues(e)} required/>
                <br/>
                <label htmlFor="password">סיסמא</label>
                <input type="password" id="password" name="password" 
                        onChange={(e) => updateCurrentValues(e)} required />
                <br/>
                <label htmlFor="phone">טלפון</label>
                <input type="tel" id="phone" name="phone" 
                        onChange={(e) => updateCurrentValues(e)} required/>
                <br/>
                <label htmlFor="email">כתובת אימייל</label>
                <input type="email" id="email" name="email" 
                        onChange={(e) => updateCurrentValues(e)} required />
                <br/>
                
                <button>הירשם</button>
            </form>
            {error && <div className="error-message">{error}</div>}
            <Link to="/">כבר נרשמת אלינו? התחבר כאן</Link>
            </>
  </div>
    )
}

export default Register;