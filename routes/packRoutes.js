const express = require('express');
const packController = require('../controllers/packController');

const router = express.Router();

router
  .route('/')
  // @route    GET api/v1/packs
  // @desc     Get all packs
  // @access   Public
  .get(packController.getAllPacks)
  // @route    POST api/v1/packs
  // @desc     Create pack
  // @access   Private
  .post(packController.createPack);

router
  .route('/:id')
  // @route     GET api/v1/packs/:id
  // @desc     Update pack by ID
  // @access   Private
  .put(packController.updatePack)
  // @route    DELETE api/v1/packs/:id
  // @desc     Delete pack by ID
  // @access   Private
  .delete(packController.deletePack);


router.route('/:id/contents')
  // @route     GET api/v1/packs/:id/contents
  // @desc      Get both samples and presets of the pack
  // @access    Public
  .get(packController.getPackContents)

router.route('/:id/contents/:type')
  // @route     GET api/v1/packs/:id/contents/:type
  // @desc      Get certain content type belonging to a pack
  // @access    Public
  .get(packController.getPackContents)

// TODO: download route for pack


module.exports = router;
