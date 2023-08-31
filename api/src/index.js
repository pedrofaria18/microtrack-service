const express = require('express');
const axios = require('axios');

const cors = require('./middlewares/cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});