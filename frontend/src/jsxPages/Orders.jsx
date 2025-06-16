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

  return (
    <div className="orders-page">
      <h1>{role === 'manager' ? 'כל ההזמנות' : 'ההזמנות שלי'}</h1>
      <div className="orders-grid">
        {orders.map((order) => (
          <div className="order-card" key={order.id}>
            <h3>הזמנה #{order.id}</h3>
            <p><strong>כמות מבוגרים:</strong> {order.sum_adult_parcipants}</p>
            <p><strong>כמות ילדים:</strong> {order.sum_child_parcipants}</p>
            <p><strong>פנסיון מלא:</strong> {order.full_board ? 'כן' : 'לא'}</p>
            <p><strong>מחיר סופי:</strong> ₪{order.final_price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
