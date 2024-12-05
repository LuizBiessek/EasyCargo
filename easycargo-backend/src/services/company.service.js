const { Company } = require('../models');

class CompanyService {
  async getAllCompanies() {
    return Company.findAll({ include: 'User' }); // Inclui informações do usuário associado
  }

  async getCompanyById(id) {
    return Company.findByPk(id, { include: 'User' });
  }

  async createCompany(companyData) {
    return Company.create(companyData);
  }

  async updateCompany(id, companyData) {
    const company = await Company.findByPk(id);
    if (!company) {
      throw new Error('Company not found');
    }
    return company.update(companyData);
  }

  async deleteCompany(id) {
    const company = await Company.findByPk(id);
    if (!company) {
      throw new Error('Company not found');
    }
    return company.destroy();
  }
}

module.exports = new CompanyService();
