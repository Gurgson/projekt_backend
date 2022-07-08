const express = require('express');
const cookieParser = require('cookie-parser');
const proxy = require('express-http-proxy');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));
app.use(express.json());
app.use(cookieParser());

app.use('/nightingale/', proxy('127.0.0.1:3000'));
app.use('/users/', proxy('127.0.0.1:3001'));

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log('Gateway on port ' + PORT);
});
