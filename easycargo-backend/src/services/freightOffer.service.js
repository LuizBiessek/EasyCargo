const { FreightOffer, Company, LoadingLocation } = require('../models');

class FreightOfferService {
  async getAllFreightOffers() {
    return FreightOffer.findAll({ include: ['Company', 'LoadingLocation'] });
  }

  async getFreightOfferById(id) {
    return FreightOffer.findByPk(id, { include: ['Company', 'LoadingLocation'] });
  }

  async getAvailableFreightOffers(filter) {
    const whereCondition = {};

    // Adiciona filtro por estado de origem
    if (filter.originState) {
      whereCondition['$LoadingLocation.state$'] = filter.originState;
    }

    // Adiciona filtro por estado de destino
    if (filter.destinationState) {
      whereCondition.deliveryAddress = {
        [Op.like]: `%${filter.destinationState}%`,
      };
    }

    return FreightOffer.findAll({
      include: [
        {
          model: LoadingLocation,
          attributes: ['state'], // Inclui apenas o estado do local de carga
        },
      ],
      where: whereCondition,
    });
  }

  async createFreightOffer(freightOfferData) {
    // Verifica se a empresa existe
    const company = await Company.findByPk(freightOfferData.companyId);
    if (!company) {
      throw new Error('Company not found');
    }

    // Verifica se o local de carga existe
    const loadingLocation = await LoadingLocation.findByPk(freightOfferData.loadingLocationId);
    if (!loadingLocation) {
      throw new Error('LoadingLocation not found');
    }

    return FreightOffer.create(freightOfferData);
  }

  async updateFreightOffer(id, freightOfferData) {
    const freightOffer = await FreightOffer.findByPk(id);
    if (!freightOffer) {
      throw new Error('FreightOffer not found');
    }

    // Verifica se a empresa existe
    const company = await Company.findByPk(freightOfferData.companyId);
    if (!company) {
      throw new Error('Company not found');
    }

    // Verifica se o local de carga existe
    const loadingLocation = await LoadingLocation.findByPk(freightOfferData.loadingLocationId);
    if (!loadingLocation) {
      throw new Error('LoadingLocation not found');
    }

    return freightOffer.update(freightOfferData);
  }

  async deleteFreightOffer(id) {
    const freightOffer = await FreightOffer.findByPk(id);
    if (!freightOffer) {
      throw new Error('FreightOffer not found');
    }
    return freightOffer.destroy();
  }
}

module.exports = new FreightOfferService();
