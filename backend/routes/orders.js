import express from 'express';
import { createOrder,getOrdersByUserId,getAllOrders } from '../controllers/ordersCon.js';
import { verifyToken } from '../middlewares/verifyToken.js';


const router = express.Router();
router.post('/',verifyToken, createOrder);
router.get('/myOrders',verifyToken, getOrdersByUserId);
router.get('/',verifyToken, getAllOrders);


export default router;
