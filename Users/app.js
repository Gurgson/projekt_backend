const express = require('express');

const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const app = express();
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
//security http
app.use(helmet());
//dev logging
// console.log(process.env.DBLOCAL);
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('dev'));
}
// Body parser
app.use(express.json({ limit: '10kb' }));
//Cookie parser
app.use(cookieParser());
//data sanitization
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
//global middlewares

const limiter = rateLimit({
  max: 250,
  windowMs: 30 * 60 * 1000,
  message: 'Too many requests'
});

app.use('/api', limiter);

// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   next();
// });

//Routes
const userRouter = require('./routes/userRoutes');

const devRouter = require('./routes/devRoutes');
app.use('/api/', userRouter);
if (process.env.NODE_ENV != 'production') {
  app.use('/dev/', devRouter);
}
// Unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find route for ${req.originalUrl}`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
