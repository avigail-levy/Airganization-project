import express from 'express';
import { getPicturesByPackageId } from '../controllers/picturesCon.js';

const router = express.Router();

router.get('/:packageId', getPicturesByPackageId);

export default router;

