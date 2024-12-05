const express = require('express');
const freightOfferController = require('../controllers/freightOffer.controller');

const router = express.Router();

router.get('/available', freightOfferController.getAvailableFreightOffers);
router.get('/', freightOfferController.getAllFreightOffers);
router.get('/:id', freightOfferController.getFreightOfferById);
router.post('/', freightOfferController.createFreightOffer);
router.put('/:id', freightOfferController.updateFreightOffer);
router.delete('/:id', freightOfferController.deleteFreightOffer);

module.exports = router;
