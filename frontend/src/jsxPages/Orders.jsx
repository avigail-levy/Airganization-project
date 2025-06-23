import { useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import fetchData from "../service/FetchData";
import './css/Orders.css'; 
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { currentUser } = useUserContext();
  const [orders, setOrders] = useState([]);
  if (!currentUser) return <p>טוען משתמש...</p>;

  const role = currentUser.role;
  const navigate = useNavigate();

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
const deleteOrder = async (orderId) => {
  try{
    fetchData(`orders/patch`, 'PATCH', {id: orderId});
    setOrders(prev => prev.filter(order => order.invitation_id !== invitation_id));
  }
  catch (error) {
    console.error("Error deleting order:", error);
  }
}
  return (
     <div className="orders-page">
      <h1>{role === 'manager' ? 'כל ההזמנות' : 'ההזמנות שלי'}</h1>
      <div className="orders-grid">
        {orders.map((order ,index) => (
         <div className="order-card" key={index}>
 <img src={`http://localhost:3000${order.image_url}`} 
              alt={order.alt_text} 
    className="order-image" />
  <div className="order-info">
    <h2>{order.vacation_name}</h2>
    <p className="order-description"></p>
    <p><strong>יעד:</strong> {order.country_name},{order.continent_name}</p>
    <p><strong>תאריכים:</strong> {formatDate(order.start_date)} - {formatDate(order.end_date)}</p>
    <p><strong>כמות מבוגרים:</strong> {order.sum_adult_parcipants}</p>
    <p><strong>כמות ילדים:</strong> {order.sum_child_parcipants}</p>
    <p><strong>פנסיון מלא:</strong> {order.full_board ? 'כן' : 'לא'}</p>
    <p><strong>מחיר סופי:</strong> ₪{order.final_price}</p>
    {role === 'manager' && <p><strong>שם המזמין:</strong> {order.user_name}</p>}
    {role==='customer' && <button onClick={() => {console.log(order.invitation_id), deleteOrder(order.invitation_id)}}>ביטול</button>
    &&<button onClick={() => {navigate('/home/')}}>ערוך</button>}
  </div>
</div>

        ))}
      </div>
    </div>
  );
};
export default Orders;
