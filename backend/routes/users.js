import express from 'express';
import { getUserById } from '../controllers/usersCon.js';

const router = express.Router();
router.get('/:id', getUserById);


export default router;
