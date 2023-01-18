const express = require('express');
const packController = require('../controllers/packController');

const router = express.Router();

router
  .route('/')
  .get(packController.getAllPacks)
  .post(packController.createPack);

router
  .route('/:id')
  .put(packController.updatePack)
  .delete(packController.deletePack);

// router.route('/:id/samples').get(packController.getSamples)

module.exports = router;
