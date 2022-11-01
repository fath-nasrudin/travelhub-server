const mongoose = require('mongoose');

const dbConfig = {
  mongoose,
  dbUri: {
    test: process.env.MONGODB_URI_TEST,
    dev: process.env.MONGODB_URI_DEV,
    prod: process.env.MONGODB_URI_PROD,
  },
};

module.exports = dbConfig;
