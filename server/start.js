const app = require('./index.js');

const dotenv = require('dotenv');

//setting up the dotenv config
dotenv.config({
  path: './.env'
})

const port = process.env.PORT;

app.listen(port, () => { console.log(`User-module server is running in ${process.env.NODE_ENV} on port ${port}`); });

