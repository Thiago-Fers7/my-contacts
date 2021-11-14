const express = require('express');
require('express-async-errors');

const cors = require('./app/middlewares/cors');
const errorHandler = require('./app/middlewares/errorHandler');
const routes = require('./routes');

const app = express();

app.use(express.json()); // Middleware para receber body nas rotas
app.use(cors);
app.use(routes);

// Error handler (middleware para tratar erros que o express detectar em todo o programa) para metódos não assíncronos
app.use(errorHandler);

app.listen(3333, () => console.log('Server started at http://locahost:3333'));
