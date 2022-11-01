const googleAuth = require('./googleAuth');
const tokenAndHash = require('./tokenAndHash');

module.exports = {
  ...googleAuth,
  ...tokenAndHash,
};
