import express from 'express';
import { getVacationsPackages,postVacation,getVacationPackageById} from '../controllers/vacationsCon.js';

const router = express.Router();
router.get('/', getVacationsPackages);
router.get('/:id', getVacationPackageById);
router.post('/',postVacation);

export default router;
