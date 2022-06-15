const express = require('express');

const morgan = require('morgan');

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('dev'));
}
const userRouter = require('./routes/userRoutes');
const trackRouter = require('./routes/trackRoutes');
const albumsRouter = require('./routes/trackRoutes');
const publishersRouter = require('./routes/trackRoutes');
const genresRouter = require('./routes/trackRoutes');

app.use('/api/users/', userRouter);
app.use('/api/tracks/', trackRouter);
app.use('/api/albums/', albumsRouter);
app.use('/api/publishers/', publishersRouter);
app.use('/api/genres/', genresRouter);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'serv res', app: 'projekt' });
});

app.post('/', (req, res) => {
  res.send('xddd');
});
module.exports = app;
