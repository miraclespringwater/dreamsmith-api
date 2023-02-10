const express = require('express');
const packController = require('../controllers/packController');
const sampleController = require('../controllers/sampleController');

const exactAccept = require('../middleware/exactAccept');
const uploadPackResource = require('../middleware/uploadPackResource');

const router = express.Router();

router.get('/', packController.getAllPacks);
router.post('/', packController.createPack);

router.get('/:packId', packController.getPack);
router.patch('/:packId', packController.updatePack);
router.delete('/:packId', packController.deletePack);

/* router.get('/:packId/samples', exactAccept('application/zip'), sampleController.getPackSampleFiles); */
router.get('/:packId/samples', sampleController.getPackSampleFiles);
/* router.get('/:packId/samples', sampleController.getPackSamples); */
router.post('/:packId/samples', uploadPackResource.single('samples-zip'), sampleController.sampleUploadHandler);

module.exports = router;
