const User = require('../../models/user.model');
const UserService = require('./user.service');

module.exports = UserService(User);
