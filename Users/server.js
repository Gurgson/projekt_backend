const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({
  path: './config.env'
});
const app = require('./app');

const port = process.env.PORT;

// const DB = process.env.DATABASEURL.replace(
//   '<password>',
//   process.env.DBPASSWORD
// );

const DB = process.env.DBLOCAL;
console.log(DB);
mongoose
  .connect(DB, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('DB ng_users Connected');
  })
  .catch((error) => {
    console.log('DB ng_sers connect failed');
  });
app.listen(port, () => {
  console.log(
    `server users running port: ${port} in ${process.env.NODE_ENV} mode`
  );
});
