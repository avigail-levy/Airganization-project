import { useState, useEffect } from 'react';
import '../css/VacationOrder.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserContext } from '../UserContext';
import fetchData from '../../service/FetchData';

const calcTotalPrice = (adults, children, adultPrice, childPrice) => {
  const totalAdults = Number(adults) || 0;
  const totalChildren = Number(children) || 0;
  return totalAdults * Number(adultPrice) + totalChildren * Number(childPrice);
};

const AddUpdateVacationOrder = () => {
  const { currentUser } = useUserContext();
  const location = useLocation();
  const navigate = useNavigate();

  const isEditOrder = location.pathname.includes('order/update');
  const existingOrder = isEditOrder ? location.state : null;
  const vacationPackage = !isEditOrder ? location.state : null;

  const [pricing, setPricing] = useState({ adult_price: 0, child_price: 0 });
  const [packageName, setPackageName] = useState('');
  const [pricingReady, setPricingReady] = useState(!isEditOrder);
  const [pay, setPay] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    vacationId: vacationPackage?.id || null,
    user_id: currentUser?.id || null,
    sum_adult_parcipants: 0,
    sum_child_parcipants: 0,
    full_board: false,
    discount_code: null,
    final_price: 0,
    isActive: true,
  });

  const resolvePackagePricing = async (order) => {
    const fromOrder = Number(order.adult_price);
    const childFromOrder = Number(order.child_price);
    if (fromOrder > 0 || childFromOrder > 0) {
      return { adult_price: fromOrder, child_price: childFromOrder };
    }

    if (order.package_id) {
      const pkg = await fetchData(`vacationPackages/${order.package_id}`);
      return {
        adult_price: Number(pkg.adult_price),
        child_price: Number(pkg.child_price),
      };
    }

    const packages = await fetchData('vacationPackages');
    const pkg = packages.find((p) => p.name === order.vacation_name);
    if (pkg) {
      return {
        adult_price: Number(pkg.adult_price),
        child_price: Number(pkg.child_price),
      };
    }

    return { adult_price: 0, child_price: 0 };
  };

  useEffect(() => {
    if (!isEditOrder && vacationPackage) {
      setPricing({
        adult_price: Number(vacationPackage.adult_price),
        child_price: Number(vacationPackage.child_price),
      });
      setPackageName(vacationPackage.name);
      setPricingReady(true);
      setFormData((prev) => ({
        ...prev,
        vacationId: vacationPackage.id,
      }));
    }
  }, [isEditOrder, vacationPackage]);

  useEffect(() => {
    if (!isEditOrder || !existingOrder) return;

    const loadEditOrder = async () => {
      try {
        const prices = await resolvePackagePricing(existingOrder);
        setPricing(prices);
        setPackageName(existingOrder.vacation_name);
        setPricingReady(true);

        setFormData({
          id: existingOrder.invitation_id,
          vacationId: existingOrder.package_id || null,
          user_id: existingOrder.user_id,
          sum_adult_parcipants: Number(existingOrder.sum_adult_parcipants) || 0,
          sum_child_parcipants: Number(existingOrder.sum_child_parcipants) || 0,
          full_board: Boolean(existingOrder.full_board),
          discount_code: existingOrder.discount_code || null,
          final_price: calcTotalPrice(
            existingOrder.sum_adult_parcipants,
            existingOrder.sum_child_parcipants,
            prices.adult_price,
            prices.child_price
          ),
          isActive: true,
        });
      } catch (error) {
        console.error('שגיאה בטעינת פרטי ההזמנה:', error);
        alert('לא ניתן לטעון את פרטי החבילה לחישוב מחיר');
      }
    };

    loadEditOrder();
  }, [isEditOrder]);

  useEffect(() => {
    if (!pricingReady) return;

    setFormData((prev) => ({
      ...prev,
      final_price: calcTotalPrice(
        prev.sum_adult_parcipants,
        prev.sum_child_parcipants,
        pricing.adult_price,
        pricing.child_price
      ),
    }));
  }, [
    formData.sum_adult_parcipants,
    formData.sum_child_parcipants,
    pricing.adult_price,
    pricing.child_price,
    pricingReady,
  ]);

  useEffect(() => {
    if (currentUser?.id) {
      setFormData((prev) => ({
        ...prev,
        user_id: currentUser.id,
      }));
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let val = type === 'checkbox' ? checked : value;

    if (name === 'sum_adult_parcipants' || name === 'sum_child_parcipants') {
      val = value === '' ? 0 : Number(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const checkFormat = () => {
    const adults = Number(formData.sum_adult_parcipants);
    const children = Number(formData.sum_child_parcipants);

    if (adults < 0 || children < 0) {
      alert('מספר משתתפים לא תקין');
      return false;
    }
    if (isEditOrder && !formData.id) {
      alert('שגיאה: מזהה הזמנה חסר');
      return false;
    }
    if (!pricing.adult_price && !pricing.child_price) {
      alert('לא ניתן לחשב מחיר – פרטי החבילה חסרים');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkFormat()) return;

    try {
      if (isEditOrder) {
        await fetchData('orders/update', 'PUT', {
          id: Number(formData.id),
          user_id: Number(formData.user_id),
          sum_adult_parcipants: Number(formData.sum_adult_parcipants),
          sum_child_parcipants: Number(formData.sum_child_parcipants),
          full_board: formData.full_board ? 1 : 0,
          final_price: Number(formData.final_price),
        });
        alert('ההזמנה עודכנה בהצלחה');
      } else {
        await fetchData('orders/order', 'POST', {
          ...formData,
          vacationId: Number(formData.vacationId),
          user_id: Number(formData.user_id),
          sum_adult_parcipants: Number(formData.sum_adult_parcipants),
          sum_child_parcipants: Number(formData.sum_child_parcipants),
          full_board: formData.full_board ? 1 : 0,
          final_price: Number(formData.final_price),
        });
        alert('ההזמנתך נוספה בהצלחה');
      }
      navigate('/home/myOrders');
    } catch (error) {
      console.error('שגיאה בשליחה:', error);
      alert('אירעה שגיאה בעדכון ההזמנה. נסי שוב.');
    }
  };

  if (isEditOrder && !existingOrder) {
    return <p>שגיאה בטעינת ההזמנה. נא לחזור לדף הקודם.</p>;
  }

  if (!isEditOrder && !vacationPackage) {
    return <p>שגיאה בטעינת פרטי החבילה. נא לחזור לדף הקודם.</p>;
  }

  return (
    <div className="vacation-order-container">
      <h2>{isEditOrder ? 'עריכת הזמנה קיימת' : 'הזמנת חבילת נופש'}</h2>
      <h3>{packageName}</h3>

      {isEditOrder && !pricingReady && <p>טוען פרטי מחיר...</p>}

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
            checked={Boolean(formData.full_board)}
            onChange={handleChange}
          />
        </label>

        <p>
          <strong>מחיר כולל להזמנה:</strong>{' '}
          {pricingReady ? `₪${formData.final_price}` : 'מחשב...'}
        </p>

        <button type="button" onClick={() => setPay(!pay)}>
          {pay ? 'הסתר תשלום' : 'לתשלום'}
        </button>

        {pay && <img src="http://localhost:3000/images/payment.png" alt="תשלום" />}
        {pay && (
          <button type="submit" disabled={isEditOrder && !pricingReady}>
            {isEditOrder ? 'עדכן הזמנה' : 'שלח הזמנה'}
          </button>
        )}
      </form>
    </div>
  );
};

export default AddUpdateVacationOrder;
