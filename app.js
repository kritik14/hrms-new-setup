const express =require('express') ;
const dotenv  =require('dotenv'); 

const bodyParser = require('body-parser');
const cors =require('cors');

const publicRoutes =require('./src/routes/public');
const apiRoutes =require('./src/routes/api');
const apiMiddleware =require('./src/middleware/apiAuth') ;
const adminMiddleware =require('./src/middleware/adminAuth');
const errorHandler =require( './src/middleware/errorHandler');

dotenv.config();
require('./src/config/sequelize');

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(cors());
app.use(bodyParser.json());
app.use('/pub', publicRoutes);
app.use('/api', apiMiddleware, apiRoutes);
app.use('/api/admin', apiMiddleware, adminMiddleware);
app.use(errorHandler);

module.exports = app;
