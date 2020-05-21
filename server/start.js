const dotenv = require('dotenv');
const app = require('./index.js');

// setting up the dotenv config
dotenv.config({
  path: './.env',
});

const port = process.env.PORT || 5000;


app.listen(port, () => { console.log(`User-module server is running in ${process.env.NODE_ENV} on port ${port}`); });
