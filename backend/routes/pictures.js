import express from 'express';
import { getPicturesByPackageId, addPicture } from '../controllers/picturesCon.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/add', verifyToken(['manager']), addPicture);
router.get('/:packageId', getPicturesByPackageId);

export default router;

