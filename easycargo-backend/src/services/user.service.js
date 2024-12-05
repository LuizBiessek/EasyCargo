const { User } = require('../models');

class UserService {
  async getAllUsers() {
    return User.findAll();
  }

  async getUserById(id) {
    return User.findByPk(id);
  }

  async createUser(userData) {
    return User.create(userData);
  }

  async updateUser(id, userData) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user.update(userData);
  }

  async deleteUser(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user.destroy();
  }
}

module.exports = new UserService();
