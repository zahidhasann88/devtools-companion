import express from 'express';
import { convertColor } from '../controllers/colorController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post('/convert', authMiddleware, convertColor);

export default router;
