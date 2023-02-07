# TODO

- [X] Create API features
- [X] Create samples by pack route with api features /packs/:id/samples
- [ ] Create presets by pack route with api features /packs/:id/presets
- [X] Create contents by pack route with api features /packs/:id/contents (only tested with samples)
- [ ] Create contents upload route
- [ ] Create publish route ??

## API Structure
* Packs are created first with info
* Packs info can be retrieved from packs route
* Packs content data (samples, presets) can be retrieved from **packs/contents** route
* Packs content files are uploaded in bulk .zip from **packs/contents** route
  * Packs content data is generated based on .zip file structure and then uploaded to database
* Packs content can be deleted from **packs/contents** route
* *May need to let AWS/Wasabi handle the file uploads and downloads via a link*

## Routes
- [X] **/api/v1/packs**
- [X] ***GET:***  Get all metadata about sound packs with API features
- [X] ***POST:*** Create new pack

- [ ] **/api/v1/packs/:packId**
- [X] ***GET<json>:*** Get metadata about a pack by ID
- [ ] ***GET<zip>:*** Download .zip of a single pack's presets and samples
- [X] ***PATCH:*** Update metadata about a pack
- [X] ***DELETE:*** Delete pack by Id

- [ ] **/api/v1/packs/:packId/cover**
- [ ] ***GET:*** Get pack cover artwork
- [ ] ***PUT:*** Create/update pack cover artwork

- [ ] **/api/v1/packs/:packId/demos**
- [ ] ***GET:*** Get metadata for all demos
- [ ] ***POST:*** Add new demo track

- [ ] **/api/v1/packs/:packId/demos/:demoId**
- [ ] ***GET:*** Get demo mp3 file for single demo track
- [ ] ***PATCH:*** Update metadata for single demo track
- [ ] ***DELETE***: Delete single demo track

- [ ] **/api/v1/packs/:packId/samples**
- [X] ***GET<json>:*** Get metadata about all samples belonging to a pack
- [ ] ***GET<zip>:*** Download all samples belonging to a pack (using res.format)
- [ ] ***POST<formdata>:*** Upload .zip of a pack's samples
 
- [ ] **/api/v1/packs/:packId/presets**
- [X] ***GET<json>:*** Get metadata about all presets belonging to a pack
- [ ] ***GET<zip>:*** Download all presets belonging to a pack (using res.format)
- [ ] ***POST<formdata>:*** Upload .zip of a pack's presets

 
 
 
 
 
- [ ] **/api/v1/(samples|presets)**
- [ ] ***GET:*** Get metainformation about samples or presets

- [ ] **/api/v1/(samples|presets)/:soundId**
- [ ] ***GET:*** Get metainformation about a preset or sample
- [ ] ***PATCH:*** Update metainformation about a preset or sample
- [ ] ***DELETE:*** Delete a preset or sample

- [ ] */api/v1/(samples|presets)/:soundId/preview* GET
- [ ] ***GET:*** Get mp3 preview of a preset or sample

- [ ] */api/v1/(samples|presets)/:soundId/file* GET
- [ ] ***GET:*** Download single file preset or sample






























* /beats GET POST
  * /beats/:beatId GET PATCH DELETE
  * /beats/:beatId/file GET

* /users GET POST
  * /users/:userId
  * /users/:userId/photo GET POST PATCH DELETE
