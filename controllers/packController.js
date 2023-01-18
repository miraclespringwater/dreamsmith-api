const Pack = require('../models/packModel');

exports.getAllPacks = async (req, res) => {
  try {
    // 1
    /* Filter fields from the query string
    stored on req.query. These are the query
    params passed after the URL:
    i.e. /packs?page=2&limit=1*/

    // The URL query params
    const queryObj = { ...req.query };
    const excludedFields = [
      ('page', 'sort', 'limit', 'fields'),
    ];
    excludedFields.forEach(
      (field) => delete queryObj[field]
    );

    // 1B advanced filtering
    /* This handles transforming plain text
    operators into operators that can be
    used by the mongoose query */
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    /* Then we create the actual query
    object by passing the query string
    back into the object.
    This created query object will
    eventually be awaited and perform
    the query */

    let query = Pack.find(JSON.parse(queryStr));

    // 2) Sorting
    /* If the request query has a sort
    object, we want to sort by the specified
    fields. Fields will be seperated by a
    comma.
    */
    if (req.query.sort) {
      query = query.sort(
        req.query.sort.split(',').join(' ')
      );
    } else {
      query = query.sort('-createdAt');
    }

    // 3) Field limiting
    /* This allows the API to only return
    certain fields when specified, when
    fields are specified in the query.
    Fields can be removed by putting a
    minus in front of the field name.
    These fields will again be separated
    by commas.
    Default is to remove the version.
    */
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // 4) Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    if (req.query.page) {
      const numPacks = await Pack.countDocuments();
      if (skip >= numPacks) {
        throw new Error('This page does not exist');
      }
    }

    query = query.skip(skip).limit(limit);

    const packs = await query;

    res.status(200).json(packs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 'fail' });
  }
};

exports.createPack = async (req, res) => {
  const pack = await Pack.create(req.body);
  console.log(pack);
  res.status(200).json({ status: 'success', data: pack });
};

exports.updatePack = async (req, res) => {
  const pack = await Pack.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({ status: 'success', data: pack });
};

exports.deletePack = async (req, res) => {
  await Pack.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: 'success', data: null });
};
