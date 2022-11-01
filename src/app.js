const express = require('express');
const cors = require('cors');

const basicConfig = require('./config/basic');
const routes = require('./routes');

const app = express();

// cors
const corsOptions = {
  origin: '*',
};
app.use(cors(corsOptions));

// parser
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

// routes
app.get('/', (req, res) => res.redirect(basicConfig.api.path));
app.use(basicConfig.api.path, routes);

// page not found handler
app.use((req, res, next) => {
  res.status(404).json({ msg: 'Endpoint not found' });
});

// error handler
app.use((err, req, res, next) => {
  let { message } = err;
  if (!err.isOperational) {
    console.log(err);

    if (basicConfig.node.env === 'production') { message = 'Internal Server Error'; }
  }

  res.status(err.statusCode || 500).send({ message });
});

module.exports = app;
