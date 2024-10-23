require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');

const usuarioRouter = require('./src/modules/user/user.routes');
const cancionesRouter = require('./src/modules/canciones/canciones.routes');

const app = express();
const port = process.env.PORT;

// Enable CORS
app.use(cors({
  origin: 'https://frontprog3.vercel.app', // URL de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Origin', 'X-Requested-With', 'Content-Type', 'Accept',
    'X-UserId', 'X-Nonce', 'X-Secret', 'X-Ts', 'X-Sig',
    'X-Vendor-Sig', 'X-Vendor-Apikey', 'X-Vendor-Nonce',
    'X-Vendor-Ts', 'X-ProfileId', 'X-Authorization', 'Authorization', 'Token',
    'Pragma', 'Cache-Control', 'Expires',
    'params' // Añade 'params' aquí
  ]
}));


// Enable request body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.DB_RECLAMO, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', async (request, response) => {
  return response.send('Backend reclamos node js express');
});

// Routers
app.use(usuarioRouter);
app.use(cancionesRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
