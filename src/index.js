const express = require('express');

const routes = require('./routes');

const app = express();

app.use(express.json()); // Middleware para receber body nas rotas
app.use(routes);

app.listen(3000, () => console.log('Server started at http://locahost:3000'));
