import { useLocation, useNavigate } from 'react-router-dom';
import './css/VacationPackagesDetails.css';
import { useUserContext } from './UserContext';
import LoginPopup from './LoginPopup';
import { useState, useEffect } from 'react';
import fetchData from '../service/FetchData';

const VacationPackagesDetails = () => {
  const location = useLocation();
  const { currentUser } = useUserContext();
  const vacationPackage = location.state;
  const navigate = useNavigate();
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const [pictures, setPictures] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/pictures/${vacationPackage.id}`);
        const data = await response.json();
        setPictures(data);
      } catch (err) {
        console.error('שגיאה בהבאת תמונות:', err);
      }
    };
    fetchPictures();
  }, [vacationPackage.id]);

  if (!vacationPackage) {
    return <p>שגיאה בטעינת החבילה. נא לחזור לדף הקודם.</p>;
  }

  const {
    name,
    start_date,
    end_date,
    description,
    adult_price,
    child_price,
    available_slots,
  } = vacationPackage;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const deleteVacationPackage = async () => {
    try {
      fetchData(`vacationPackages/patch`, 'PATCH', { id: vacationPackage.id });
      navigate('/home/vacationPackages');
    } catch (error) {
      console.error("Error deleting vacation package:", error);
    }
  };

  const handleOrder = () => {
    if (!currentUser) {
      setShowLoginPopup(true);
      return false;
    } else {
      return true;
    }
  };

  const isManager = currentUser && currentUser.role === "manager";

  return (
    <div className="package-details-container">
      <h1 className="title">{name}</h1>

      {pictures.length > 0 && (
        <div className="image-slider">
          <button
            className="slider-arrow left"
            onClick={() => setCurrentIndex((currentIndex - 1 + pictures.length) % pictures.length)}
          >
            &lt;
          </button>
          <img
            src={`http://localhost:3000${pictures[currentIndex].image_url}`}
            alt={pictures[currentIndex].alt_text}
            className="package-image"
          />

          <button
            className="slider-arrow right"
            onClick={() => setCurrentIndex((currentIndex + 1) % pictures.length)}
          >
            &gt;
          </button>
        </div>
      )}

      <div className="details-grid">
        <p>📅 <strong>תאריכים:</strong> {formatDate(start_date)} - {formatDate(end_date)}</p>
        <p>📦 <strong>מקומות פנויים:</strong> {available_slots}</p>
        <p>👤 <strong>מחיר למבוגר:</strong> ₪{adult_price}</p>
        <p>👶 <strong>מחיר לילד:</strong> ₪{child_price}</p>
      </div>

      <p className="description">{description}</p>

      <div className="button-row">
        {isManager &&
          <button className="action-btn" onClick={() => navigate(`/home/vacationPackages/update`, { state: vacationPackage.id })}>
            עריכה
          </button>}

        {!isManager &&
          <button className="action-btn" onClick={() => {
            if (handleOrder()) {
              navigate(`/home/vacationPackages/order`, { state: vacationPackage });
            }
          }}>
            הזמן חבילה
          </button>
        }
        {isManager &&
          <button className="action-btn" onClick={() => {
            if (handleOrder()) {
              deleteVacationPackage();
            }
          }}>
            מחק
          </button>
        }
      </div>

      {showLoginPopup && <LoginPopup onClose={() => setShowLoginPopup(false)} />}
    </div>
  );
};

export default VacationPackagesDetails;
