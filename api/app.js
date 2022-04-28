const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const db = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

// Load Config File
dotenv.config({ path: './.env' });

// Connect To Database
db()
  .then()
  .catch((e) => console.log(e));

// Express App
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(cors());

// index page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// api automatic documentaion
// Extended: https://swagger.io/specification/#infoObject
const { swaggerOptions } = require('./docs/swagger');

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Load Routes
const usersRoute = require('./routes/users');
const followsRoute = require('./routes/follows');
const productRoute = require('./routes/products');

// const { loginReq } = require('./middlewares/authMiddleware');
// const { adminReq } = require('./middlewares/authorizationMiddleware');

const apiVersion = '/api/v1';

// Use Routes
app.use(`${apiVersion}/users`, usersRoute);
app.use(`${apiVersion}/follows`, followsRoute);
app.use(`${apiVersion}/products`,productRoute);


// Error handler middleware
app.use(errorHandler);

module.exports = app;
