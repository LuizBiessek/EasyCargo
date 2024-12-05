const { DriverDocument, Driver, DocumentType } = require('../models');

class DriverDocumentService {
  async getAllDriverDocuments() {
    return DriverDocument.findAll({ include: ['User', 'DocumentType'] });
  }

  async getDriverDocumentById(id) {
    return DriverDocument.findByPk(id, { include: ['User', 'DocumentType'] });
  }

  async createDriverDocument(driverDocumentData) {
    // Verifica se o motorista existe
    const driver = await Driver.findByPk(driverDocumentData.userId);
    if (!driver) {
      throw new Error('Driver not found');
    }

    // Verifica se o tipo de documento existe
    const documentType = await DocumentType.findByPk(driverDocumentData.documentTypeId);
    if (!documentType) {
      throw new Error('DocumentType not found');
    }

    return DriverDocument.create(driverDocumentData);
  }

  async updateDriverDocument(id, driverDocumentData) {
    const driverDocument = await DriverDocument.findByPk(id);
    if (!driverDocument) {
      throw new Error('DriverDocument not found');
    }

    // Verifica se o motorista existe
    const driver = await Driver.findByPk(driverDocumentData.userId);
    if (!driver) {
      throw new Error('Driver not found');
    }

    // Verifica se o tipo de documento existe
    const documentType = await DocumentType.findByPk(driverDocumentData.documentTypeId);
    if (!documentType) {
      throw new Error('DocumentType not found');
    }

    return driverDocument.update(driverDocumentData);
  }

  async deleteDriverDocument(id) {
    const driverDocument = await DriverDocument.findByPk(id);
    if (!driverDocument) {
      throw new Error('DriverDocument not found');
    }
    return driverDocument.destroy();
  }
}

module.exports = new DriverDocumentService();
