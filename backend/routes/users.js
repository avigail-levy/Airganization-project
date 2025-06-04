import express from 'express';
import { getUserById,getUserByUserNamePassword } from '../controllers/usersCon.js';

const router = express.Router();
router.get('/:id', getUserById);
router.post('/', getUserByUserNamePassword)


export default router;
