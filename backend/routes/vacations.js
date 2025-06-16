import express from 'express';
import { getVacationsPackages,postVacation} from '../controllers/vacationsCon.js';

const router = express.Router();
router.get('/', getVacationsPackages);
router.post('/',postVacation);

export default router;
