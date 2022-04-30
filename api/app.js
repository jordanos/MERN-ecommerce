const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// pagination
const paginate = require('express-paginate');

// Load Config File
dotenv.config({ path: './.env' });

// Express App
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(cors());

// const { loginReq } = require('./middlewares/authMiddleware');
// const { adminReq } = require('./middlewares/authorizationMiddleware');

// index page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// api automatic documentaion
// Extended: https://swagger.io/specification/#infoObject
const { swaggerOptions } = require('./docs/swagger');

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// pagination middleware
app.use(paginate.middleware(10, 50));

// Load Routes
const usersRoute = require('./routes/users');
const productRoute = require('./routes/products');
const categoriesRoute = require('./routes/categories');
const followsRoute = require('./routes/follows');
const authRoute = require('./routes/auth');
const feedsRoute = require('./routes/feeds');
const likesRoute = require('./routes/likes');
const messagesRoute = require('./routes/messages');
const notificationsRoute = require('./routes/notifications');

// Use Routes
const apiVersion = '/api/v1';
app.use(`${apiVersion}/users`, usersRoute);
app.use(`${apiVersion}/products`, productRoute);
app.use(`${apiVersion}/categories`, categoriesRoute);
app.use(`${apiVersion}/follows`, followsRoute);
app.use(`${apiVersion}/auth`, authRoute);
app.use(`${apiVersion}/feeds`, feedsRoute);
app.use(`${apiVersion}/likes`, likesRoute);
app.use(`${apiVersion}/messages`, messagesRoute);
app.use(`${apiVersion}/notifications`, notificationsRoute);

const errorHandler = require('./middlewares/errorHandler');
// Error handler middleware
app.use(errorHandler);

module.exports = app;
