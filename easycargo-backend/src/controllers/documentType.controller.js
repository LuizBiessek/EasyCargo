const documentTypeService = require('../services/documentType.service');
const { documentTypeValidationSchema } = require('../validations/documentType.validation');

class DocumentTypeController {
  async getAllDocumentTypes(req, res) {
    try {
      const documentTypes = await documentTypeService.getAllDocumentTypes();
      res.json(documentTypes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getDocumentTypeById(req, res) {
    try {
      const documentType = await documentTypeService.getDocumentTypeById(req.params.id);
      if (!documentType) {
        return res.status(404).json({ error: 'DocumentType not found' });
      }
      res.json(documentType);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createDocumentType(req, res) {
    try {
      const { error } = documentTypeValidationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const documentType = await documentTypeService.createDocumentType(req.body);
      res.status(201).json(documentType);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateDocumentType(req, res) {
    try {
      const { error } = documentTypeValidationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const documentType = await documentTypeService.updateDocumentType(req.params.id, req.body);
      res.json(documentType);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteDocumentType(req, res) {
    try {
      await documentTypeService.deleteDocumentType(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new DocumentTypeController();
