const freightOfferService = require('../services/freightOffer.service');
const { freightOfferValidationSchema } = require('../validations/freightOffer.validation');

class FreightOfferController {
  async getAllFreightOffers(req, res) {
    try {
      const freightOffers = await freightOfferService.getAllFreightOffers();
      res.json(freightOffers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getFreightOfferById(req, res) {
    try {
      const freightOffer = await freightOfferService.getFreightOfferById(req.params.id);
      if (!freightOffer) {
        return res.status(404).json({ error: 'FreightOffer not found' });
      }
      res.json(freightOffer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAvailableFreightOffers(req, res) {
    try {
      const { originState, destinationState } = req.query;

      const filters = {
        originState: originState || null,
        destinationState: destinationState || null,
      };

      const availableOffers = await freightOfferService.getAvailableFreightOffers(filters);
      res.json(availableOffers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createFreightOffer(req, res) {
    try {
      const { error } = freightOfferValidationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const freightOffer = await freightOfferService.createFreightOffer(req.body);
      res.status(201).json(freightOffer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateFreightOffer(req, res) {
    try {
      const { error } = freightOfferValidationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const freightOffer = await freightOfferService.updateFreightOffer(req.params.id, req.body);
      res.json(freightOffer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteFreightOffer(req, res) {
    try {
      await freightOfferService.deleteFreightOffer(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new FreightOfferController();
