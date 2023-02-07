const express = require('express');
const packController = require('../controllers/packController');
const sampleController = require('../controllers/sampleController');

const checkAccepts = require('../middleware/checkAccepts');

const router = express.Router();

router
  .route('/')
  .get(packController.getAllPacks)
  .post(packController.createPack);

router
  .route('/:packId')
  .get(packController.getPack)
  .patch(packController.updatePack)
  .delete(packController.deletePack);

router
  .route('/:packId/samples')
  .get(checkAccepts.json, sampleController.getSamplesByPack)
  .post((req, res) => {
    res.json({ message: 'uploaded samples for pack' });
  });

router
  .route('/:packId/samples')
  .get(checkAccepts.zip, (req, res) =>
    res.json({ message: 'zip endpoint' })
  );

router
  .route('/:packId/presets')
  .get(packController.getPackPresets);

module.exports = router;

/*
TODO: find better way to handle requrests based on
accept header middleware that accepts an object
option 1: (current) checkAccepts middleware that calls next('route') to
          move to next route. This won't let the client know what routes
          accept headers are expected.
option 2: checkAccepts middleware that accepts an object with each key being
          a accept header type, the value referencing a controller method
          if the accept header isn't found, throw an error to err handler
          saying to check the accept header
option 3: (not good) the controller itself checks accept header and performs
          actions based on that
option 4: checkAccepts on .all()
option 5: (probably the best) .use() middleware on main packs/ router that checks the accepts header
          and defers to the correct sub-router based on accepts header
          and throws an error if no applicable accepts header is given
            router.use((req, res, next) => {
              if (req.accepts('application/json')) {
                packDataRouter(req, res, next);
              } else if (req.accepts('application/octet-stream')) {
                packFileRouter(req, res, next)
              } else {
                throw new AppError('some message', 403)
              }
})
*/
