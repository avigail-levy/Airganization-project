import express from 'express';
import { getUserById,getUserByUserNamePassword,getAllUser } from '../controllers/usersCon.js';
import { verifyToken } from '../middlewares/verifyToken.js';
const router = express.Router();
router.get('/id',verifyToken, getUserById);
router.get('/',verifyToken, getAllUser);
router.post('/', getUserByUserNamePassword);

export default router;
