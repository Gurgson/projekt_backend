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
const trackRouter = require('./routes/trackRoutes');
const albumsRouter = require('./routes/albumRoutes');
const publishersRouter = require('./routes/publishersRoutes');
const genresRouter = require('./routes/genreRoutes');
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/tracks/', trackRouter);
app.use('/api/albums/', albumsRouter);
app.use('/api/publishers/', publishersRouter);
app.use('/api/genres/', genresRouter);

// Unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find route for ${req.originalUrl}`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
