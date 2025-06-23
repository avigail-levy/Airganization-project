import express from 'express';
import { getAllContinents } from '../controllers/continentsCon.js';
import  {verifyToken}  from '../middlewares/verifyToken.js';


const router = express.Router();
router.get('/',verifyToken(),  getAllContinents);


export default router;
