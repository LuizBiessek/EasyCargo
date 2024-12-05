const loadingLocationService = require('../services/loadingLocation.service');
const { loadingLocationValidationSchema } = require('../validations/loadingLocation.validation');

class LoadingLocationController {
  async getAllLoadingLocations(req, res) {
    try {
      const locations = await loadingLocationService.getAllLoadingLocations();
      res.json(locations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getLoadingLocationById(req, res) {
    try {
      const location = await loadingLocationService.getLoadingLocationById(req.params.id);
      if (!location) {
        return res.status(404).json({ error: 'LoadingLocation not found' });
      }
      res.json(location);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createLoadingLocation(req, res) {
    try {
      const { error } = loadingLocationValidationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const location = await loadingLocationService.createLoadingLocation(req.body);
      res.status(201).json(location);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateLoadingLocation(req, res) {
    try {
      const { error } = loadingLocationValidationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const location = await loadingLocationService.updateLoadingLocation(req.params.id, req.body);
      res.json(location);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteLoadingLocation(req, res) {
    try {
      await loadingLocationService.deleteLoadingLocation(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new LoadingLocationController();
