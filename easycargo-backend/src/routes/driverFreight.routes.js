const express = require('express');
const driverFreightController = require('../controllers/driverFreight.controller');

const router = express.Router();

router.get('/', driverFreightController.getAllDriverFreights);
router.get('/:id', driverFreightController.getDriverFreightById);
router.get('/active/:driverId', driverFreightController.getActiveFreightsByDriver);
router.post('/', driverFreightController.createDriverFreight);
router.put('/:id', driverFreightController.updateDriverFreight);
router.delete('/:id', driverFreightController.deleteDriverFreight);

module.exports = router;
