import express from 'express';
import { createOrder ,getOrdersByUserId,getAllOrders,patchOrder,updateOrder } from '../controllers/ordersCon.js';
import  {verifyToken} from '../middlewares/verifyToken.js';


const router = express.Router();
router.post('/order',verifyToken(['customer']), createOrder);
router.put('/update',verifyToken(['customer']), updateOrder);
router.get('/myOrders',verifyToken(), getOrdersByUserId);
router.get('/', verifyToken(['manager']), getAllOrders);
router.patch('/patch',verifyToken(['customer']), patchOrder);


export default router;
