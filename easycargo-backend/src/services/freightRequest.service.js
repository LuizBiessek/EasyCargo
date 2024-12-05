const { FreightRequest, FreightOffer, Driver } = require('../models');

class FreightRequestService {
  async getAllFreightRequests() {
    return FreightRequest.findAll({ include: ['FreightOffer', 'Driver'] });
  }

  async getFreightRequestById(id) {
    return FreightRequest.findByPk(id, { include: ['FreightOffer', 'Driver'] });
  }

  async getPendingRequestsByCompanyId(companyId) {
    // Verifica se a empresa existe
    const company = await Company.findByPk(companyId);
    if (!company) {
      throw new Error('Company not found');
    }

    // Busca as solicitações pendentes relacionadas à empresa
    return FreightRequest.findAll({
      include: [
        {
          model: FreightOffer,
          where: { companyId }, // Filtra pelas ofertas da empresa
          include: ['Company'], // Inclui informações da empresa
        },
      ],
      where: { status: 'aguardando' }, // Filtra solicitações pendentes
    });
  }

  async createFreightRequest(requestData) {
    // Verifica se a oferta de frete existe
    const freightOffer = await FreightOffer.findByPk(requestData.freightOfferId);
    if (!freightOffer) {
      throw new Error('FreightOffer not found');
    }

    // Verifica se o motorista existe
    const driver = await Driver.findByPk(requestData.driverId);
    if (!driver) {
      throw new Error('Driver not found');
    }

    return FreightRequest.create(requestData);
  }

  async updateFreightRequest(id, requestData) {
    const freightRequest = await FreightRequest.findByPk(id);
    if (!freightRequest) {
      throw new Error('FreightRequest not found');
    }

    // Verifica se a oferta de frete existe
    const freightOffer = await FreightOffer.findByPk(requestData.freightOfferId);
    if (!freightOffer) {
      throw new Error('FreightOffer not found');
    }

    // Verifica se o motorista existe
    const driver = await Driver.findByPk(requestData.driverId);
    if (!driver) {
      throw new Error('Driver not found');
    }

    return freightRequest.update(requestData);
  }

  async deleteFreightRequest(id) {
    const freightRequest = await FreightRequest.findByPk(id);
    if (!freightRequest) {
      throw new Error('FreightRequest not found');
    }
    return freightRequest.destroy();
  }
}

module.exports = new FreightRequestService();
