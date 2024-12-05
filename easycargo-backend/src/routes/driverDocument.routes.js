const express = require('express');
const driverDocumentController = require('../controllers/driverDocument.controller');

const router = express.Router();

router.get('/', driverDocumentController.getAllDriverDocuments);
router.get('/:id', driverDocumentController.getDriverDocumentById);
router.post('/', driverDocumentController.createDriverDocument);
router.put('/:id', driverDocumentController.updateDriverDocument);
router.delete('/:id', driverDocumentController.deleteDriverDocument);

module.exports = router;
