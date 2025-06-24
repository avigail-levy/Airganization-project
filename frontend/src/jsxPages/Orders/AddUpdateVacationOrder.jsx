import { useState, useEffect } from 'react';
import '../css/VacationOrder.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserContext } from '../UserContext';
import fetchData from '../../service/FetchData';

const AddUpdateVacationOrder = () => {
  const { currentUser } = useUserContext();
  const [pay, setPay] = useState(false);
  const location = useLocation();
  const vacationPackage = location.state;

  const navigate = useNavigate();

  if (!vacationPackage) {
    return <p>שגיאה בטעינת פרטי החבילה. נא לחזור לדף הקודם.</p>;
  }

  const [formData, setFormData] = useState({
    vacationId: vacationPackage.id,
    user_id: currentUser.id,
    sum_adult_parcipants: 0,
    sum_child_parcipants: 0,
    full_board: false,
    discount_code: null,
    final_price: 0,
    isActive: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  // חישוב מחיר כולל לפי מספר ילדים ומבוגרים
  useEffect(() => {
    const totalAdults = parseInt(formData.sum_adult_parcipants) || 0;
    const totalChildren = parseInt(formData.sum_child_parcipants) || 0;

    const totalPrice =
      totalAdults * vacationPackage.adult_price +
      totalChildren * vacationPackage.child_price;

    setFormData((prev) => ({
      ...prev,
      final_price: totalPrice,
    }));
  }, [formData.sum_adult_parcipants, formData.sum_child_parcipants, vacationPackage]);

  useEffect(() => {
    if (currentUser && currentUser.id) {
      setFormData((prev) => ({
        ...prev,
        user_id: currentUser.id,
      }));
    }
  }, [currentUser]);

  const checkFormat = () => {
    if (formData.sum_adult_parcipants < 0 || formData.sum_child_parcipants < 0) {
      alert('מספר משתתפים לא תקין');
      return false;
    }
    return true;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(checkFormat())
    {
      console.log('cu', currentUser.id)
    console.log('הוזמנה חבילה עם הנתונים הבאים:', formData);
    try{
    fetchData('orders/order', 'POST', formData);
    }
    catch(error){
      console.log(error);
    }
    alert('הזמנתך נוספה בהצלחה');
    navigate('/home/myOrders');
    }
    
  };
  return (
    <div className="vacation-order-container">
      <h2>הזמנת חבילת נופש</h2>
      <h3>{vacationPackage.name}</h3>
      <form onSubmit={handleSubmit} className="vacation-order-form">
        <label>
          מספר משתתפים מבוגרים:
          <input
            type="number"
            name="sum_adult_parcipants"
            value={formData.sum_adult_parcipants}
            onChange={handleChange}
            min={0}
            required
          />
        </label>

        <label>
          מספר ילדים:
          <input
            type="number"
            name="sum_child_parcipants"
            value={formData.sum_child_parcipants}
            onChange={handleChange}
            min={0}
            required
          />
        </label>

        <label>
          פנסיון מלא:
          <input
            type="checkbox"
            name="full_board"
            checked={formData.full_board}
            onChange={handleChange}
          />
        </label>
        <p><strong>מחיר כולל להזמנה:</strong> ₪{formData.final_price}</p>
        <button type='button' onClick={() => setPay(!pay)}>לתשלום</button>
        {pay && <img src="http://localhost:3000/images/payment.png" alt="תשלום" />}
        {pay && <button>שלח הזמנה</button>}
      </form>
    </div>
  );
};

export default AddUpdateVacationOrder;
