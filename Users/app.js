const express = require('express');

const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('dev'));
}
// const userRouter = require('./routes/userRoutes');

// Body parser
app.use(express.json({ limit: '10kb' }));
// app.use('/api/users/', userRouter);

// Unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find route for ${req.originalUrl}`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
