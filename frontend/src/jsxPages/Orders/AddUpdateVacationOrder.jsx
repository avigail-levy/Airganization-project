import { useState, useEffect } from 'react';
import '../css/VacationOrder.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserContext } from '../UserContext';
import fetchData from '../../service/FetchData';

const AddUpdateVacationOrder = () => {
  const { currentUser } = useUserContext();
  const location = useLocation();
  const navigate = useNavigate();

  const vacationPackage = location.state?.vacation;
  const order = location.state?.order || null;


  const [pay, setPay] = useState(false);

  const [formData, setFormData] = useState({
    id:order.invitation_id||null,
    vacationId: vacationPackage?.id || null,
    user_id: currentUser?.id || null,
    sum_adult_parcipants: 0,
    sum_child_parcipants: 0,
    full_board: false,
    discount_code: null,
    final_price: 0,
    isActive: true
  });

  // אם מדובר בעריכת הזמנה קיימת – נטען אותה לתוך ה־form
  useEffect(() => {
    if (order) {
      setFormData({
        vacationId: order.vacationId,
        user_id: order.user_id,
        sum_adult_parcipants: order.sum_adult_parcipants,
        sum_child_parcipants: order.sum_child_parcipants,
        full_board: order.full_board,
        discount_code: order.discount_code || null,
        final_price: order.final_price,
        isActive: order.isActive
      });
    }
  }, []);

  // חישוב מחיר כולל לפי מספר מבוגרים וילדים
  useEffect(() => {
    if (!vacationPackage) return;

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

  // עדכון מזהה משתמש אם משתנה
  useEffect(() => {
    if (currentUser && currentUser.id) {
      setFormData((prev) => ({
        ...prev,
        user_id: currentUser.id,
      }));
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const checkFormat = () => {
    if (formData.sum_adult_parcipants < 0 || formData.sum_child_parcipants < 0) {
      alert('מספר משתתפים לא תקין');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkFormat()) return;

    try {
      if (order) {
        await fetchData('orders/update', 'PUT', formData);
        alert('ההזמנה עודכנה בהצלחה');
      } else {
        await fetchData('orders/order', 'POST', formData);
        alert('הזמנתך נוספה בהצלחה');
      }
      navigate('/home/myOrders');
    } catch (error) {
      console.error('שגיאה בשליחה:', error);
      alert('אירעה שגיאה. נסי שוב.');
    }
  };

  if (!vacationPackage) {
    return <p>שגיאה בטעינת פרטי החבילה. נא לחזור לדף הקודם.</p>;
  }

  return (
    <div className="vacation-order-container">
      <h2>{order ? 'עריכת הזמנה קיימת' : 'הזמנת חבילת נופש'}</h2>
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

        <button type="button" onClick={() => setPay(!pay)}>
          {pay ? 'הסתר תשלום' : 'לתשלום'}
        </button>

        {pay && <img src="http://localhost:3000/images/payment.png" alt="תשלום" />}
        {pay && (
          <button type="submit">
            {order ? 'עדכן הזמנה' : 'שלח הזמנה'}
          </button>
        )}
      </form>
    </div>
  );
};

export default AddUpdateVacationOrder;
