import express from 'express';
import { getVacationsPackages } from '../controllers/vacationsCon.js';

const router = express.Router();
router.get('/', getVacationsPackages);


export default router;
