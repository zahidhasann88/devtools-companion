import express from 'express';
import { testRegex } from '../controllers/regexController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post('/test', authMiddleware, testRegex);

export default router;
