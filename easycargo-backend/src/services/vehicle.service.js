const { Vehicle, User } = require('../models');

class VehicleService {
  async getAllVehicles() {
    return Vehicle.findAll({ include: 'User' });
  }

  async getVehicleById(id) {
    return Vehicle.findByPk(id, { include: 'User' });
  }

  async createVehicle(vehicleData) {
    // Verifica se o proprietário (usuário) existe
    const owner = await User.findByPk(vehicleData.ownerId);
    if (!owner) {
      throw new Error('Owner not found');
    }

    return Vehicle.create(vehicleData);
  }

  async updateVehicle(id, vehicleData) {
    const vehicle = await Vehicle.findByPk(id);
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    // Verifica se o proprietário (usuário) existe
    const owner = await User.findByPk(vehicleData.ownerId);
    if (!owner) {
      throw new Error('Owner not found');
    }

    return vehicle.update(vehicleData);
  }

  async deleteVehicle(id) {
    const vehicle = await Vehicle.findByPk(id);
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }
    return vehicle.destroy();
  }
}

module.exports = new VehicleService();
