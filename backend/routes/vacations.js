import express from 'express';
import { getVacationsPackages,createVacation,getVacationPackageById,updateVacation,
    getVacationsPackagesForHome,patchVacationPackage
} from '../controllers/vacationsCon.js';
import  {verifyToken}  from '../middlewares/verifyToken.js';

const router = express.Router();
router.get('/', getVacationsPackages);
router.get('/home', getVacationsPackagesForHome);
router.post('/add', verifyToken(['manager']), createVacation);
router.put('/update', verifyToken(['manager']),updateVacation);
router.get('/:id', verifyToken(), getVacationPackageById);
router.patch('/patch', verifyToken(['manager']), patchVacationPackage);

export default router;
