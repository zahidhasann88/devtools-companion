import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import config from './config/default';
import authRoutes from './routes/authRoutes';
import jsonRoutes from './routes/jsonRoutes';
import markdownRoutes from './routes/markdownRoutes';
import colorRoutes from './routes/colorRoutes';
import regexRoutes from './routes/regexRoutes';
import errorHandler from './middleware/errorHandler';
import logger from './utils/logger';

const app = express();
const PORT = config.port;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('DevTools Companion API');
});

app.use('/api/auth', authRoutes);
app.use('/api/json', jsonRoutes);
app.use('/api/markdown', markdownRoutes);
app.use('/api/color', colorRoutes);
app.use('/api/regex', regexRoutes);

// Error handling middleware
app.use(errorHandler);

const startServer = async () => {
  try {
    await mongoose.connect(config.mongodbUri);
    logger.info('Connected to MongoDB');
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

startServer();
