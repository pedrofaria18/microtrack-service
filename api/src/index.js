const express = require('express');

const cors = require('./app/middlewares/cors');

const routes = require('./routes');

const app = express();

const db = require('./database');

app.use(express.json());
app.use(cors);
app.use(routes);

app.listen(3001, () => {
  console.log('Server started at http://localhost:3001');
});
