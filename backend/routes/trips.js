import express from 'express';
import { getTripsByIdVacation } from '../controllers/tripsCon.js';

const router = express.Router();
router.get('/:id', getTripsByIdVacation);


export default router;
