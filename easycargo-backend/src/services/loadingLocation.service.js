const { LoadingLocation, Company } = require('../models');

class LoadingLocationService {
  async getAllLoadingLocations() {
    return LoadingLocation.findAll({ include: 'Company' });
  }

  async getLoadingLocationById(id) {
    return LoadingLocation.findByPk(id, { include: 'Company' });
  }

  async createLoadingLocation(locationData) {
    // Verifica se a empresa existe
    const company = await Company.findByPk(locationData.companyId);
    if (!company) {
      throw new Error('Company not found');
    }

    return LoadingLocation.create(locationData);
  }

  async updateLoadingLocation(id, locationData) {
    const loadingLocation = await LoadingLocation.findByPk(id);
    if (!loadingLocation) {
      throw new Error('LoadingLocation not found');
    }

    // Verifica se a empresa existe
    const company = await Company.findByPk(locationData.companyId);
    if (!company) {
      throw new Error('Company not found');
    }

    return loadingLocation.update(locationData);
  }

  async deleteLoadingLocation(id) {
    const loadingLocation = await LoadingLocation.findByPk(id);
    if (!loadingLocation) {
      throw new Error('LoadingLocation not found');
    }
    return loadingLocation.destroy();
  }
}

module.exports = new LoadingLocationService();
