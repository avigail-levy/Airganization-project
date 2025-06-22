import { useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import fetchData from "../service/FetchData";
import './css/Orders.css'; 

const Orders = () => {
  const { currentUser } = useUserContext();
  const [orders, setOrders] = useState([]);
  const role = currentUser.role;

  useEffect(() => {
    if (role === 'manager') {
      getAllOrders();
    } else if (role === 'customer') {
      getMyOrders();
    }
  }, [role]); // עדכון חשוב! שה־role כבר קיים כשמתבצעת הבדיקה

  const getMyOrders = async () => {
    try {
      const response = await fetchData('orders/myOrders');
      setOrders(response);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const getAllOrders = async () => {
    try {
      const response = await fetchData('orders');
      setOrders(response);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('he-IL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
  return (
     <div className="orders-page">
      <h1>{role === 'manager' ? 'כל ההזמנות' : 'ההזמנות שלי'}</h1>
      <div className="orders-grid">
        {orders.map((order) => (
         <div className="order-card" key={order.invitation_id}>
  <img 
    src={order.image_url || 'https://via.placeholder.com/300x200?text=Vacation'} 
    alt={order.alt_text || 'Vacation'} 
    className="order-image" 
  />
  <div className="order-info">
    <h2>{order.vacation_name}</h2>
    <p className="order-description">{order.description}</p>
    <p><strong>יעד:</strong> {order.country_name}, {order.continent_name}</p>
    <p><strong>תאריכים:</strong> {formatDate(order.start_date)} - {formatDate(order.end_date)}</p>
    <p><strong>מבוגרים:</strong> {order.sum_adult_parcipants}</p>
    <p><strong>ילדים:</strong> {order.sum_child_parcipants}</p>
    <p><strong>פנסיון מלא:</strong> {order.full_board ? 'כן' : 'לא'}</p>
    <p><strong>מחיר סופי:</strong> ₪{order.final_price}</p>
    {role === 'manager' && <p><strong>שם המזמין:</strong> {order.user_name}</p>}
  </div>
</div>

        ))}
      </div>
    </div>
  );
};
export default Orders;
