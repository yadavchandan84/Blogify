import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';

import uploadRoutes from './routes/upload.route.js';

dotenv.config();

// Fail fast instead of buffering queries for ~100s when the DB is unreachable.
mongoose.set('bufferTimeoutMS', 5000);

mongoose
  .connect(process.env.MONGO, {
    serverSelectionTimeoutMS: 8000,
  })
  .then(() => {
    console.log('✅ MongoDB is connected');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    console.error(
      'Tip: If this mentions IP whitelisting, add your current IP in MongoDB Atlas → Network Access.',
    );
  });

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB disconnected');
});

const app = express();

app.use(express.json());
app.use(cookieParser());

// Reject API requests quickly with a clear message when the DB is down,
// instead of letting queries hang until they time out.
app.use('/api', (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      statusCode: 503,
      message:
        'Database is not connected. Please try again shortly. (Check MongoDB Atlas IP whitelist if this persists.)',
    });
  }
  next();
});

app.listen(3000, () => {
  console.log('🚀 Server is running on port 3000');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes)

app.use('/api', uploadRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
