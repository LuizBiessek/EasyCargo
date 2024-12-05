const driverFreightService = require('../services/driverFreight.service');
const { driverFreightValidationSchema } = require('../validations/driverFreight.validation');

class DriverFreightController {
  async getAllDriverFreights(req, res) {
    try {
      const driverFreights = await driverFreightService.getAllDriverFreights();
      res.json(driverFreights);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getDriverFreightById(req, res) {
    try {
      const driverFreight = await driverFreightService.getDriverFreightById(req.params.id);
      if (!driverFreight) {
        return res.status(404).json({ error: 'DriverFreight not found' });
      }
      res.json(driverFreight);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getActiveFreightsByDriver(req, res) {
    try {
      const { driverId } = req.params;

      if (!driverId) {
        return res.status(400).json({ error: 'Driver ID is required' });
      }

      const activeFreights = await driverFreightService.getActiveFreightsByDriver(driverId);

      if (activeFreights.length === 0) {
        return res.status(404).json({ error: 'No active freights found for this driver' });
      }

      res.json(activeFreights);
    } catch (error) {
      console.error('Error fetching active freights:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createDriverFreight(req, res) {
    try {
      const { error } = driverFreightValidationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const driverFreight = await driverFreightService.createDriverFreight(req.body);
      res.status(201).json(driverFreight);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateDriverFreight(req, res) {
    try {
      const { error } = driverFreightValidationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const driverFreight = await driverFreightService.updateDriverFreight(req.params.id, req.body);
      res.json(driverFreight);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteDriverFreight(req, res) {
    try {
      await driverFreightService.deleteDriverFreight(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new DriverFreightController();
