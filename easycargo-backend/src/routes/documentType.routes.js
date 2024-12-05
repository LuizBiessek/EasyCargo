const express = require('express');
const documentTypeController = require('../controllers/documentType.controller');

const router = express.Router();

router.get('/', documentTypeController.getAllDocumentTypes);
router.get('/:id', documentTypeController.getDocumentTypeById);
router.post('/', documentTypeController.createDocumentType);
router.put('/:id', documentTypeController.updateDocumentType);
router.delete('/:id', documentTypeController.deleteDocumentType);

module.exports = router;
