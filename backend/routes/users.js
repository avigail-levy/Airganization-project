import express from 'express';
import { getUserById,getUserByUserNamePassword,getAllUser,registerUser,updateUser } from '../controllers/usersCon.js';
import { verifyToken } from '../middlewares/verifyToken.js';
const router = express.Router();
 
router.get('/id', verifyToken, getUserById);
router.get('/', verifyToken, getAllUser);
router.post('/login', getUserByUserNamePassword);
router.post('/register', registerUser);
router.put('/update', verifyToken,updateUser)

export default router;