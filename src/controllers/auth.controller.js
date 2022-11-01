const userService = require('../services/user');

class UserController {
  static async signin(req, res, next) {
    try {
      const { body } = req;
      const token = await userService.signin(body);
      res.json({ data: { token } });
    } catch (error) {
      next(error);
    }
  }

  static async signup(req, res, next) {
    try {
      const { body } = req;
      await userService.signup(body);
      res.status(201).json({ message: 'Success registered. Please login' });
    } catch (error) {
      next(error);
    }
  }

  static async googleAuth(req, res, next) {
    try {
      const { body } = req;
      const token = await userService.googleAuth(body);
      res.json({ data: { token } });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
