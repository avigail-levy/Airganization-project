import express from 'express';
import { getVacationsPackages,createVacation,getVacationPackageById,updateVacation,
    getVacationsPackagesForHome,deleteVacationPackage
} from '../controllers/vacationsCon.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();
router.get('/', getVacationsPackages);
router.get('/home',getVacationsPackagesForHome);
router.post('/add',verifyToken, createVacation);
router.put('/update',verifyToken,updateVacation);
router.get('/:id',verifyToken, getVacationPackageById);
router.delete('/:id',verifyToken, deleteVacationPackage);

export default router;
