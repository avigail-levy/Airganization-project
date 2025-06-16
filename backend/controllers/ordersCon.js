import ordersMod from '../models/ordersMod.js';

export async function createOrder(req, res) {
    console.log('order',req.body);
    const orderData = req.body;
  try {
    const order = await ordersMod.createOrder(orderData);
    if (!order) return res.status(404).json({ message: 'orders not found' });
    res.json(order);
  }
   catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
} 
export async function getOrdersByUserId(req, res) {
  const id=req.user.id;
  try {
    const orders = await ordersMod.getOrdersByUserId(id);
    if (!orders) return res.status(404).json({ message: 'orders not found' });
    res.json(orders);
  }
   catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
} 
export async function getAllOrders(req, res) {
  try {
    const orders = await ordersMod.getAllOrders();
    if (!orders) return res.status(404).json({ message: 'orders not found' });
    res.json(orders);
  }
   catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
} 

