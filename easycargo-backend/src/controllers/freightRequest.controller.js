const freightRequestService = require('../services/freightRequest.service');
const { freightRequestValidationSchema } = require('../validations/freightRequest.validation');

class FreightRequestController {
  async getAllFreightRequests(req, res) {
    try {
      const freightRequests = await freightRequestService.getAllFreightRequests();
      res.json(freightRequests);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getFreightRequestById(req, res) {
    try {
      const freightRequest = await freightRequestService.getFreightRequestById(req.params.id);
      if (!freightRequest) {
        return res.status(404).json({ error: 'FreightRequest not found' });
      }
      res.json(freightRequest);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getPendingRequestsByCompanyId(req, res) {
    try {
      const { companyId } = req.params;

      if (!companyId) {
        return res.status(400).json({ error: 'Company ID is required' });
      }

      const pendingRequests = await freightRequestService.getPendingRequestsByCompanyId(companyId);
      res.json(pendingRequests);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createFreightRequest(req, res) {
    try {
      const { error } = freightRequestValidationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const freightRequest = await freightRequestService.createFreightRequest(req.body);
      res.status(201).json(freightRequest);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateFreightRequest(req, res) {
    try {
      const { error } = freightRequestValidationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const freightRequest = await freightRequestService.updateFreightRequest(req.params.id, req.body);
      res.json(freightRequest);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteFreightRequest(req, res) {
    try {
      await freightRequestService.deleteFreightRequest(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new FreightRequestController();
