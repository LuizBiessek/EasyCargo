const { Driver } = require('../models');

class DriverService {
  async getAllDrivers() {
    return Driver.findAll({ include: 'User' }); // Inclui informações do usuário
  }

  async getDriverById(id) {
    return Driver.findByPk(id, { include: 'User' });
  }

  async createDriver(driverData) {
    return Driver.create(driverData);
  }

  async updateDriver(id, driverData) {
    const driver = await Driver.findByPk(id);
    if (!driver) {
      throw new Error('Driver not found');
    }
    return driver.update(driverData);
  }

  async deleteDriver(id) {
    const driver = await Driver.findByPk(id);
    if (!driver) {
      throw new Error('Driver not found');
    }
    return driver.destroy();
  }
}

module.exports = new DriverService();
