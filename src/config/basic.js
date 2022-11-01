const basicConfig = {
  port: process.env.PORT || 3001,
  node: {
    env: process.env.NODE_ENV || 'development',
  },
  api: {
    path: '/api/v1',
  },
};

module.exports = basicConfig;
