const vehicleService = require('../services/vehicle.service');
const { vehicleValidationSchema } = require('../validations/vehicle.validation');

class VehicleController {
  async getAllVehicles(req, res) {
    try {
      const vehicles = await vehicleService.getAllVehicles();
      res.json(vehicles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getVehicleById(req, res) {
    try {
      const vehicle = await vehicleService.getVehicleById(req.params.id);
      if (!vehicle) {
        return res.status(404).json({ error: 'Vehicle not found' });
      }
      res.json(vehicle);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createVehicle(req, res) {
    try {
      const { error } = vehicleValidationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const vehicle = await vehicleService.createVehicle(req.body);
      res.status(201).json(vehicle);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateVehicle(req, res) {
    try {
      const { error } = vehicleValidationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const vehicle = await vehicleService.updateVehicle(req.params.id, req.body);
      res.json(vehicle);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteVehicle(req, res) {
    try {
      await vehicleService.deleteVehicle(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new VehicleController();
