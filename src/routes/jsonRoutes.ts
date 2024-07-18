import express from 'express';
import { formatJson } from '../controllers/jsonController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post('/format', authMiddleware, formatJson);

export default router;
