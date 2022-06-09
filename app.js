const express = require('express');

const app = express();

const userRouter = require('./routes/userRoutes');
const bookRouter = require('./routes/bookRoutes');

app.use('/api/users/', userRouter);
app.use('/api/book/', bookRouter);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'serv res', app: 'projekt' });
});

app.post('/', (req, res) => {
  res.send('xddd');
});
module.exports = app;
