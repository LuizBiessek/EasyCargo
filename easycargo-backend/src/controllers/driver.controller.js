const driverService = require('../services/driver.service');
const { driverValidationSchema } = require('../validations/driver.validation');

class DriverController {
  async getAllDrivers(req, res) {
    try {
      const drivers = await driverService.getAllDrivers();
      res.json(drivers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getDriverById(req, res) {
    try {
      const driver = await driverService.getDriverById(req.params.id);
      if (!driver) {
        return res.status(404).json({ error: 'Driver not found' });
      }
      res.json(driver);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createDriver(req, res) {
    try {
      const { error } = driverValidationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const driver = await driverService.createDriver(req.body);
      res.status(201).json(driver);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateDriver(req, res) {
    try {
      const { error } = driverValidationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const driver = await driverService.updateDriver(req.params.id, req.body);
      res.json(driver);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteDriver(req, res) {
    try {
      await driverService.deleteDriver(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new DriverController();
