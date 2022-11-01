const { generateHTTPError } = require('../utils/error');
const { verifyJWTToken } = require('../utils/auth');

const authenticate = async (req, res, next) => {
  try {
    // check is auth property exist
    const { authorization } = req.headers;
    if (!authorization) generateHTTPError(401, 'required authorization header to access this endpoint');

    // if authorization in the right format 'Bearer token';
    if (!authorization.startsWith('Bearer ')) generateHTTPError(401, 'Authorization not in the right format. Please use Bearer');

    const [, token] = authorization.split(' ');
    if (!token) generateHTTPError(401, 'Token not found in authorization property');

    // verify the token
    const decodedData = verifyJWTToken(token);

    req.user = decodedData;

    next();
  } catch (error) {
    next(error);
  }
};
// is admin

module.exports = {
  authenticate,
};
