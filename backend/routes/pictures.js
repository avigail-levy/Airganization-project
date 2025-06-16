import express from 'express';
import { getPicturesByIdVacation } from '../controllers/picturesCon.js';
import { verifyToken } from '../middlewares/verifyToken.js';


const router = express.Router();
router.get('/idVacation', verifyToken,getPicturesByIdVacation);


export default router;
