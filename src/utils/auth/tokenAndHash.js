const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../../config/jwt');

/**
 *
 * @param {String} data
 * @returns {Promise}
 */
const hashData = async (data) => bcrypt.hash(data, 8);

/**
 *
 * @param {*} data
 * @param {*} hashedData
 * @returns {Promise}
 */
const compareData = async (data, hashedData) => bcrypt.compare(data, hashedData);

/**
 *
 * @param {String | Object} data string id or object
 */

const generateJWTToken = (payload = {}) => jwt.sign(
  payload,
  jwtConfig.jwt.secret,
  {
    expiresIn: jwtConfig.jwt.exp,
    issuer: jwtConfig.jwt.iss,
  },
);

const generateAccessToken = ({
  _id, email, firstName, lastName, name, picture,
}) => {
  const payload = {
    _id, email, firstName, lastName, name, picture,
  };
  return generateJWTToken(payload);
};

const verifyJWTToken = (token) => jwt.verify(token, jwtConfig.jwt.secret, {});

module.exports = {
  hashData,
  compareData,
  generateJWTToken,
  generateAccessToken,
  verifyJWTToken,
};
