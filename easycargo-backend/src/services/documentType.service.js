const { DocumentType } = require('../models');

class DocumentTypeService {
  async getAllDocumentTypes() {
    return DocumentType.findAll();
  }

  async getDocumentTypeById(id) {
    return DocumentType.findByPk(id);
  }

  async createDocumentType(documentTypeData) {
    return DocumentType.create(documentTypeData);
  }

  async updateDocumentType(id, documentTypeData) {
    const documentType = await DocumentType.findByPk(id);
    if (!documentType) {
      throw new Error('DocumentType not found');
    }
    return documentType.update(documentTypeData);
  }

  async deleteDocumentType(id) {
    const documentType = await DocumentType.findByPk(id);
    if (!documentType) {
      throw new Error('DocumentType not found');
    }
    return documentType.destroy();
  }
}

module.exports = new DocumentTypeService();
