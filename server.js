const mongoose = require('mongoose');

const dotenv = require('dotenv');

const app = require('./app');

dotenv.config({
  path: './config.env',
});

const port = process.env.port;

const DB =
  process.env.DATABASEURL.replace(
    '<password>',
    process.env.DBPASSWORD
  );
mongoose
  .connect(DB)
  .then(() => {
    console.log(
      'DB Connected'
    );
  });

app.listen(port, () => {
  console.log(
    `server running port: ${port}`
  );
});
