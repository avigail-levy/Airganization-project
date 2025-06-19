import './css/LoginPopup.css';
import { useNavigate } from 'react-router-dom';

const LoginPopup = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2>עליך להתחבר או להירשם!</h2>
        <button className="popup-btn blue" onClick={() => navigate("/register", { state: { from: location.pathname } })}>הרשמה</button>
        <button className="popup-btn" onClick={() => navigate("/login", { state: { from: location.pathname } })}>התחבר</button>
        <button className="popup-btn gray" onClick={onClose}>המשך כאורח</button>
      </div>
    </div>
  );
};

export default LoginPopup;
