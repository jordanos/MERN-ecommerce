const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');

// create media folder if it doesnt exist
if (!fs.existsSync('./public/media')) {
  console.log('creating folders...');
  fs.mkdirSync('./public/media/images/users', { recursive: true });
  fs.mkdirSync('./public/media/images/products', { recursive: true });
  fs.mkdirSync('./public/media/images/feeds', { recursive: true });
  fs.mkdirSync('./public/media/images/categories', { recursive: true });
  fs.mkdirSync('./public/media/images/hero', { recursive: true });
  console.log('folders created');
}
// pagination
const paginate = require('express-paginate');

// Load Config File
dotenv.config({ path: './.env' });

// Express App
const app = express();
app.disable('etag');
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// for parsing multipart/form-data
// app.use(upload.array());

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
const tagRoute = require('./routes/tagRoute');
const followsRoute = require('./routes/follows');
const authRoute = require('./routes/auth');
const feedsRoute = require('./routes/feeds');
const likesRoute = require('./routes/likes');
const conversationsRoute = require('./routes/conversations');
const messagesRoute = require('./routes/messages');
const notificationsRoute = require('./routes/notifications');
const packageRoute = require('./routes/packages');
const searchRoute = require('./routes/search');
const rateRoute = require('./routes/rates');
const userPackageRoute = require('./routes/userPackages');
const appRoute = require('./routes/appRoute');
const transactionRoute = require('./routes/transactions');
const transactionMethodRoute = require('./routes/transactionMethods');
const ipnRoute = require('./routes/ipnRoute');
// admin
const adminRoute = require('./routes/admin');

// Use Routes
const apiVersion = '/api/v1';
app.use(`${apiVersion}/users`, usersRoute);
app.use(`${apiVersion}/products`, productRoute);
app.use(`${apiVersion}/categories`, categoriesRoute);
app.use(`${apiVersion}/tags`, tagRoute);
app.use(`${apiVersion}/follows`, followsRoute);
app.use(`${apiVersion}/auth`, authRoute);
app.use(`${apiVersion}/feeds`, feedsRoute);
app.use(`${apiVersion}/likes`, likesRoute);
app.use(`${apiVersion}/conversations`, conversationsRoute);
app.use(`${apiVersion}/messages`, messagesRoute);
app.use(`${apiVersion}/notifications`, notificationsRoute);
app.use(`${apiVersion}/packages`, packageRoute);
app.use(`${apiVersion}/search`, searchRoute);
app.use(`${apiVersion}/rates`, rateRoute);
app.use(`${apiVersion}/user-packages`, userPackageRoute);
app.use(`${apiVersion}/app`, appRoute);
app.use(`${apiVersion}/transactions`, transactionRoute);
app.use(`${apiVersion}/transaction-methods`, transactionMethodRoute);
app.use(`${apiVersion}/ipn`, ipnRoute);
// admin
app.use(`${apiVersion}/admin`, adminRoute);

const errorHandler = require('./middlewares/errorHandler');
// Error handler middleware
app.use(errorHandler);

module.exports = app;
