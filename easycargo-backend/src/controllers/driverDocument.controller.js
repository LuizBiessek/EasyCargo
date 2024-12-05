const driverDocumentService = require('../services/driverDocument.service');
const { driverDocumentValidationSchema } = require('../validations/driverDocument.validation');

class DriverDocumentController {
  async getAllDriverDocuments(req, res) {
    try {
      const driverDocuments = await driverDocumentService.getAllDriverDocuments();
      res.json(driverDocuments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getDriverDocumentById(req, res) {
    try {
      const driverDocument = await driverDocumentService.getDriverDocumentById(req.params.id);
      if (!driverDocument) {
        return res.status(404).json({ error: 'DriverDocument not found' });
      }
      res.json(driverDocument);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createDriverDocument(req, res) {
    try {
      const { error } = driverDocumentValidationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const driverDocument = await driverDocumentService.createDriverDocument(req.body);
      res.status(201).json(driverDocument);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateDriverDocument(req, res) {
    try {
      const { error } = driverDocumentValidationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const driverDocument = await driverDocumentService.updateDriverDocument(req.params.id, req.body);
      res.json(driverDocument);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteDriverDocument(req, res) {
    try {
      await driverDocumentService.deleteDriverDocument(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new DriverDocumentController();
