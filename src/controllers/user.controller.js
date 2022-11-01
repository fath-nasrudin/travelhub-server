class UserController {
  static async getUsers(req, res, next) {
    try {
      res.status(222).json({ msg: 'This feature not yet implemented' });
    } catch (error) {
      next(error);
    }
  }

  static async getUser(req, res, next) {
    try {
      res.status(222).json({ msg: 'This feature not yet implemented' });
    } catch (error) {
      next(error);
    }
  }

  static async createUser(req, res, next) {
    try {
      res.status(222).json({ msg: 'This feature not yet implemented' });
    } catch (error) {
      next(error);
    }
  }

  static async editUser(req, res, next) {
    try {
      res.status(222).json({ msg: 'This feature not yet implemented' });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      res.status(222).json({ msg: 'This feature not yet implemented' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
