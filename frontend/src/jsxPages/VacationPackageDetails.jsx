import { useLocation, useNavigate } from 'react-router-dom';
import './css/VacationPackagesDetails.css';
import { useUserContext } from './UserContext';
import LoginPopup from './LoginPopup';
import { useState } from 'react';
import fetchData from '../service/FetchData';

const VacationPackagesDetails = () => {
  const location = useLocation();
  const{currentUser}=useUserContext();
  const vacationPackage = location.state;
  const navigate = useNavigate();
  const [showLoginPopup, setShowLoginPopup] = useState(false);


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
  try{
    fetchData(`vacationPackages/${vacationPackage.id}`, 'DELETE');
    navigate('/home/vacationPackages');
  } catch (error) {
    console.error("Error deleting vacation package:", error);
  }
}
const handleOrder = () => {
  if (!currentUser) {
    setShowLoginPopup(true);
    return false;
  }
  else{
      return true;
    }
};
const isManager = currentUser && currentUser.role === "manager";
  return (
    <div className="package-details-container">
      <h1 className="title">{name}</h1>
        {vacationPackage.image_url && (
    <img src={vacationPackage.image_url} alt={vacationPackage.alt_text }
      className="package-image"/>
  )}
      <div className="details-grid">
        <p>📅 <strong>תאריכים:</strong> {formatDate(start_date)} - {formatDate(end_date)}</p>
        <p>📦 <strong>מקומות פנויים:</strong> {available_slots}</p>
        <p>👤 <strong>מחיר למבוגר:</strong> ₪{adult_price}</p>
        <p>👶 <strong>מחיר לילד:</strong> ₪{child_price}</p>
       
      </div>
      <p className="description">{description}</p>

      <div className="button-row">
        {isManager && <button className="action-btn" onClick={(e) => { 
               navigate(`/home/vacationPackages/${vacationPackage.id}`),{state:vacationPackage.id};}}>עריכה</button>
       }
         <button className="action-btn" onClick={() => navigate('trips')}>הצג טיולים</button>
       {!isManager && 
     <button className="action-btn" onClick={handleOrder&&(() => {
        navigate(`/home/vacationPackages/${vacationPackage.id}/order`, { state: vacationPackage } )
     })}>הזמן חבילה </button>}
      {isManager && 
     <button className="action-btn" onClick={handleOrder&&(() => {deleteVacationPackage()})}>מחק</button>}
      </div>
      {showLoginPopup && <LoginPopup onClose={() => setShowLoginPopup(false)} />}

    </div>
  );
};

export default VacationPackagesDetails;
