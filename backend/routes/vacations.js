import express from 'express';
import { getVacationsPackages,createVacation,getVacationPackageById,updateVacation} from '../controllers/vacationsCon.js';

const router = express.Router();
router.get('/', getVacationsPackages);
router.get('/:id', getVacationPackageById);
router.post('/add',createVacation);
router.put('/update',updateVacation);

export default router;
