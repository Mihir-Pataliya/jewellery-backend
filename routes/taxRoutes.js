'use strict';

const express = require('express');
const router = express.Router();

const {
  createTax,
  getAllTaxes,
  getTaxByMetal,
  updateTax,
  deleteTax
} = require('../controller/taxcontroller');


router.post('/createtax', createTax);

router.get('/getalltaxes', getAllTaxes);

router.get('/product/:productId', getTaxByMetal);

router.put('/:id', updateTax);

router.delete('/:id', deleteTax);

module.exports = router;
