import express from 'express';
import { getTripsByIdVacation } from '../controllers/tripsCon.js';

const router = express.Router();
router.get('/vacations/:vacationId', getTripsByIdVacation);


export default router;
