// Express
const cors = require('cors');
const express = require('express');
const app = express();
const Joi = require('joi');
const port = 3000;

// cors middleware
app.use(cors());

// Middleware to parse JSON request body
const bodyParser = require('body-parser');
app.use(bodyParser.json()); 

const productRoutes = require('./routes/productRoutes');
const customerRoutes = require('./routes/customerRoutes');
const companyRoutes = require('./routes/companyRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/products', productRoutes);
app.use('/customers', customerRoutes);
app.use('/company', companyRoutes);
app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});