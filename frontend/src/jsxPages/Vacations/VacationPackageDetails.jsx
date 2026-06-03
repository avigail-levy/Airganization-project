import { useLocation, useNavigate } from 'react-router-dom';
import '../css/VacationPackagesDetails.css';
import { useUserContext } from '../UserContext';
import LoginPopup from '../Entry/LoginPopup';
import { useState, useEffect } from 'react';
import fetchData from '../../service/FetchData';

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
        //alert
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
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const deleteVacationPackage = async () => {
    if (!window.confirm('האם למחוק את חבילת הנופש?')) return;

    try {
      await fetchData(`vacationPackages/patch`, 'PATCH', { id: vacationPackage.id });
      navigate('/home/vacationPackages', {
        state: { deletedPackageId: vacationPackage.id },
      });
    } catch (error) {
      console.error('Error deleting vacation package:', error);
      alert('שגיאה במחיקת החבילה');
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
          <div className="slider-image-wrapper">
            <button
              type="button"
              className="slider-arrow left"
              aria-label="תמונה הבאה"
              onClick={() => setCurrentIndex((currentIndex + 1) % pictures.length)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className="slider-image-frame">
              {pictures.map((picture, index) => (
                <img
                  key={picture.image_url}
                  src={`http://localhost:3000${picture.image_url}`}
                  alt={picture.alt_text}
                  className={`package-image${index === currentIndex ? ' active' : ''}`}
                />
              ))}
            </div>

            <button
              type="button"
              className="slider-arrow right"
              aria-label="תמונה קודמת"
              onClick={() => setCurrentIndex((currentIndex - 1 + pictures.length) % pictures.length)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {pictures.length > 1 && (
              <span className="slider-counter">
                {currentIndex + 1} / {pictures.length}
              </span>
            )}
          </div>

          {pictures.length > 1 && (
            <div className="slider-dots">
              {pictures.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`slider-dot${index === currentIndex ? ' active' : ''}`}
                  aria-label={`תמונה ${index + 1}`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="details-section">
        <p className="package-dates-row">
          <strong>תאריכים:</strong>
          <span className="date-value">{formatDate(start_date)}</span>
          <span className="date-separator">←</span>
          <span className="date-value">{formatDate(end_date)}</span>
        </p>

        <div className="package-stats">
          <div className="stat-item">
            <span className="stat-label">מקומות פנויים</span>
            <span className="stat-value">{available_slots}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">מחיר למבוגר</span>
            <span className="stat-value">₪{adult_price}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">מחיר לילד</span>
            <span className="stat-value">₪{child_price}</span>
          </div>
        </div>
      </div>

      <p className="description">{description}</p>

      <div className="button-row">
        {isManager &&
          <button className="action-btn" onClick={() => navigate(`/home/vacationPackages/update`, { state: { id: vacationPackage.id } })}>
            עריכה
          </button>}

        {!isManager &&
          <button className="action-btn" onClick={() => {
            console.log((vacationPackage));
            
            if (handleOrder()) {
              navigate(`/home/vacationPackages/order`, { state: vacationPackage });
            }
          }}>
            הזמן חבילה
          </button>
        }
        {isManager &&
          <button className="action-btn" onClick={deleteVacationPackage}>
            מחק
          </button>
        }
      </div>

      {showLoginPopup && <LoginPopup onClose={() => setShowLoginPopup(false)} />}
    </div>
  );
};

export default VacationPackagesDetails;
