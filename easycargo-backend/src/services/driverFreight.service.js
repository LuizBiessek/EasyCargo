const { DriverFreight, FreightOffer, LoadingLocation, Company } = require('../models');

class DriverFreightService {
  async getAllDriverFreights() {
    return DriverFreight.findAll({ include: ['FreightOffer'] });
  }

  async getDriverFreightById(id) {
    return DriverFreight.findByPk(id, { include: ['FreightOffer'] });
  }

  async createDriverFreight(driverFreightData) {
    // Verifica se a oferta de frete existe
    const freightOffer = await FreightOffer.findByPk(driverFreightData.freightOfferId);
    if (!freightOffer) {
      throw new Error('FreightOffer not found');
    }

    return DriverFreight.create(driverFreightData);
  }

  async updateDriverFreight(id, driverFreightData) {
    const driverFreight = await DriverFreight.findByPk(id);
    if (!driverFreight) {
      throw new Error('DriverFreight not found');
    }

    // Verifica se a oferta de frete existe
    const freightOffer = await FreightOffer.findByPk(driverFreightData.freightOfferId);
    if (!freightOffer) {
      throw new Error('FreightOffer not found');
    }

    return driverFreight.update(driverFreightData);
  }

  async deleteDriverFreight(id) {
    const driverFreight = await DriverFreight.findByPk(id);
    if (!driverFreight) {
      throw new Error('DriverFreight not found');
    }
    return driverFreight.destroy();
  }

  // Novo método: busca serviços ativos de um motorista
  async getActiveDriverFreightsByDriverId(driverId) {
    return DriverFreight.findAll({
      where: { status: 'em andamento', driverId },
      include: [
        {
          model: FreightOffer,
          include: [
            { model: LoadingLocation, attributes: ['city', 'state'] },
            { model: Company, attributes: ['businessName'] },
          ],
        },
      ],
    });
  }
}

module.exports = new DriverFreightService();
