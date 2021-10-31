const express = require('express');
require('express-async-errors');

const routes = require('./routes');

const app = express();

app.use(express.json()); // Middleware para receber body nas rotas
app.use(routes);

// Error handler (middleware para tratar erros que o express detectar em todo o programa) para metódos não assíncronos
app.use((error, request, response, next) => {
  console.log(error);
  response.sendStatus(500);
});

app.listen(3000, () => console.log('Server started at http://locahost:3000'));
