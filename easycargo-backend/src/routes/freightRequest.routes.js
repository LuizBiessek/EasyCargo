const express = require('express');
const freightRequestController = require('../controllers/freightRequest.controller');

const router = express.Router();

router.get('/pending/:companyId', freightRequestController.getPendingRequestsByCompanyId);
router.get('/', freightRequestController.getAllFreightRequests);
router.get('/:id', freightRequestController.getFreightRequestById);
router.post('/', freightRequestController.createFreightRequest);
router.put('/:id', freightRequestController.updateFreightRequest);
router.delete('/:id', freightRequestController.deleteFreightRequest);

module.exports = router;
