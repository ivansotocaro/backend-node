const express = require('express');
const swaggerUi = require("swagger-ui-express");
const config = require('../config');
const user = require('./components/user/network')
const auth = require('./components/auth/network')
const errors = require('../network/errors')
const swaggerDocument = require("./swagger.json");

const app = express();

app.use(express.urlencoded({extended: true }))
app.use(express.json());


//ROUTING
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
console.log('API routes loaded');
console.log('Swagger docs loaded');
app.use(errors);

app.listen(config.api.port, () => {
  console.log('listening on port ', 'localhost:'+config.api.port);
});