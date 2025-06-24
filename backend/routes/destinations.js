import express from 'express';
import { getDestinationsByContinentId } from '../controllers/destinationsCon.js';
import {verifyToken}  from '../middlewares/verifyToken.js';


const router = express.Router();
router.get('/:continentId',verifyToken(), getDestinationsByContinentId);

export default router;
