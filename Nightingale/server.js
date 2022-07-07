const mongoose = require('mongoose');
const dotenv = require('dotenv');
process.on('uncaughtException', (err) => {
  console.log(err, '\n');
  console.log(err.name, err.message);
  console.log('Shutting down');

  process.exit(1);
});

const app = require('./app');

dotenv.config({
  path: './config.env'
});

const PORT = process.env.PORT;

const DB = process.env.DATABASEURL.replace(
  '<password>',
  process.env.DBPASSWORD
);
mongoose
  .connect(DB)
  .then(() => {
    console.log('DB Connected');
  })
  .catch((error) => {
    console.log('db connect failed');
  });

const server = app.listen(PORT, () => {
  console.log(`server running port: ${PORT} in ${process.env.NODE_ENV} mode`);
});
