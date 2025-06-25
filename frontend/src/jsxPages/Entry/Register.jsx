import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import fetchData from "../../service/FetchData";
import { useUserContext } from "../UserContext";

const RegisterOrUpdate = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser, setCurrentUser } = useUserContext();
    const [error, setError] = useState('');

    const isUpdate = location.state?.isUpdate || false;
    const role = location.state?.role || 'customer';

    const [valuesInput, setValuesInput] = useState({
        name: '',
        username: '',
        phone: '',
        email: '',
        role: role,
        password: '',
        id:null
    });

    // אם מדובר בעדכון – נמלא את הערכים מתוך ה־currentUser
    useEffect(() => {
        if (isUpdate && currentUser) {
            setValuesInput({
                name: currentUser.name || '',
                username: currentUser.username || '',
                phone: currentUser.phone || '',
                email: currentUser.email || '',
                role: currentUser.role || 'customer',
                password: currentUser.password || '',
                id: currentUser.id
            });
        }
    }, [isUpdate, currentUser]);

    const validateValues = () => {
        if (valuesInput.username.length < 3) {
            setError("שם משתמש חייב להכיל לפחות 3 תווים");
            return false;
        }
        if (!/^\d{9,10}$/.test(valuesInput.phone)) {
            setError("מספר טלפון חייב להכיל 9 או 10 ספרות");
            return false;
        }
        if(!isUpdate)
        {
            if (valuesInput.password.length < 6) {
            setError("סיסמה חייבת להכיל לפחות 6 תווים");
            return false;
        } 
        }
       
        if (!valuesInput.email.includes('@')) {
            setError("כתובת אימייל לא תקינה");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!validateValues()) return;

        try {
            if (isUpdate) {
                const user = await fetchData('users/update', 'PUT', valuesInput);
                setCurrentUser(user);
                alert('הפרטים עודכנו בהצלחה');
            } 
            else {
                const response = await fetchData('users/register', 'POST', valuesInput);
                    localStorage.setItem('token', response.token);
                    setCurrentUser(response.user);
                    alert('נרשם בהצלחה!');
            }
            navigate('/home');
        } catch (error) {
            console.error('Error:', error);
            setError("שגיאה בשמירה, אנא נסה שוב");
        }
    };
    const updateCurrentValues = (e) => {
        setValuesInput({ ...valuesInput, [e.target.name]: e.target.value });
    };

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <h1 style={{ color: isUpdate ? 'orange' : role === 'manager' ? 'blue' : 'orange', fontWeight: 'bold', marginBottom: '1rem' }}>
                {isUpdate ? 'עדכון פרטים' : role === 'manager' ? 'רישום מנהל חדש' : 'הרשמה'}
            </h1>

            <form onSubmit={handleSubmit} style={{ direction: 'rtl' }}>
                <label htmlFor="name">שם:</label>
                <input type="text" id="name" name="name" value={valuesInput.name} onChange={updateCurrentValues} required />
                <br />

                <label htmlFor="username">שם משתמש:</label>
                <input type="text" id="username" name="username" value={valuesInput.username} onChange={updateCurrentValues} required/>
                <br />

                { !isUpdate && <><label htmlFor="phone">סיסמא:</label>
                <input type="password" id="password" name="password" value={valuesInput.password} onChange={updateCurrentValues} required />
                <br /></> }
    
                <label htmlFor="phone">טלפון:</label>
                <input type="tel" id="phone" name="phone" value={valuesInput.phone} onChange={updateCurrentValues} required />
                <br />

                <label htmlFor="email">כתובת אימייל:</label>
                <input type="email" id="email" name="email" value={valuesInput.email} onChange={updateCurrentValues} required />
                <br />

                <button>{isUpdate ? 'עדכן' : 'הירשם'}</button>
                
            </form> 
        </div>
    );
};

export default RegisterOrUpdate;