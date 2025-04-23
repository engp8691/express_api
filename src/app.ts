import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import itemRoutes from './routes/itemRoutes';
import { errorHandler } from './middlewares/errorHandler';
import userRoutes from './routes/userRoutes';
import { logger } from './middlewares/logger';

const app = express();
app.use(logger);
app.use(cors());

// For older versions of express, bodyParser is required
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// For express v4.16.0 or newer, built in express.json() is prefered
// app.use(express.json());

// Routes
app.use('/api/items', itemRoutes);
app.use('/api/user', userRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
