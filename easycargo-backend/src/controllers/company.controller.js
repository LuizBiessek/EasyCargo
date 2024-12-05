const companyService = require('../services/company.service');
const { companyValidationSchema } = require('../validations/company.validation');

class CompanyController {
  async getAllCompanies(req, res) {
    try {
      const companies = await companyService.getAllCompanies();
      res.json(companies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCompanyById(req, res) {
    try {
      const company = await companyService.getCompanyById(req.params.id);
      if (!company) {
        return res.status(404).json({ error: 'Company not found' });
      }
      res.json(company);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createCompany(req, res) {
    try {
      const { error } = companyValidationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const company = await companyService.createCompany(req.body);
      res.status(201).json(company);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateCompany(req, res) {
    try {
      const { error } = companyValidationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const company = await companyService.updateCompany(req.params.id, req.body);
      res.json(company);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteCompany(req, res) {
    try {
      await companyService.deleteCompany(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CompanyController();
