const express = require('express');
const cookieParser = require('cookie-parser');
const proxy = require('express-http-proxy');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config({
  path: './config.env'
});

const app = express();

app.use(morgan('common'));
app.use(express.json());
app.use(cookieParser());

app.use('/nightingale/', proxy('nightingale:3001'));
app.use('/users/', proxy('users:3002'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Gateway on port ' + PORT);
});
