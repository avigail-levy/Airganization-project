import { useLocation, useNavigate } from 'react-router-dom';
import './css/VacationPackagesDetails.css';
import { useUserContext } from './UserContext';

const VacationPackagesDetails = () => {
  const location = useLocation();
  const{currentUser}=useUserContext();
  const vacationPackage = location.state;
  const navigate = useNavigate();

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
  return (
    <div className="package-details-container">
      <h1 className="title">{name}</h1>
        {vacationPackage.image_url && (
    <img src={vacationPackage.image_url} alt={vacationPackage.alt_text }
      className="package-image"/>
  )}
      <div className="details-grid">
        <p>📅 <strong>תאריכים:</strong> {formatDate(vacationPackage.start_date)} - {formatDate(vacationPackage.end_date)}</p>
        <p>📦 <strong>מקומות פנויים:</strong> {vacationPackage.available_slots}</p>
        <p>👤 <strong>מחיר למבוגר:</strong> ₪{vacationPackage.adult_price}</p>
        <p>👶 <strong>מחיר לילד:</strong> ₪{vacationPackage.child_price}</p>
       
      </div>
      <p className="description">{description}</p>

      <div className="button-row">
        <button className="action-btn" onClick={() => navigate('trips')}>הצג טיולים</button>
       {currentUser.role==='customer' && <button className="action-btn" onClick={() => navigate(`/home/vacationPackages/${vacationPackage.id}/order`, { state: vacationPackage })}>
  הזמן חבילה
</button>}
      </div>
    </div>
  );
};

export default VacationPackagesDetails;
