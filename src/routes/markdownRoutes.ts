import express from 'express';
import { renderMarkdown } from '../controllers/markdownController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post('/render', authMiddleware, renderMarkdown);

export default router;
