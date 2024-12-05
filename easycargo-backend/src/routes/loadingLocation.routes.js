const express = require('express');
const loadingLocationController = require('../controllers/loadingLocation.controller');

const router = express.Router();

router.get('/', loadingLocationController.getAllLoadingLocations);
router.get('/:id', loadingLocationController.getLoadingLocationById);
router.post('/', loadingLocationController.createLoadingLocation);
router.put('/:id', loadingLocationController.updateLoadingLocation);
router.delete('/:id', loadingLocationController.deleteLoadingLocation);

module.exports = router;
