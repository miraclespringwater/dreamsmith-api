class APIFeatures {
  // constructor(db query obj to be awaited, query params)
  constructor(mongooseQuery, queryParamsString) {
    this.mongooseQuery = mongooseQuery;
    this.queryParamsString = queryParamsString;
  }

  // 1
  /* Filter fields from the query string
  stored on req.query. These are the query
  params passed after the URL:
  i.e. /packs?page=2&limit=1*/
  filter() {
    const queryObj = { ...this.queryParamsString };
    const excludedFields = [
      'page',
      'sort',
      'limit',
      'fields',
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

    this.mongooseQuery = this.mongooseQuery.find(
      JSON.parse(queryStr)
    );

    return this;
  }

  // 2) Sorting
  /* If the request query has a sort
  object, we want to sort by the specified
  fields. Fields will be seperated by a
  comma.
  */
  sort() {
    if (this.queryParamsString.sort) {
      const sortBy = this.queryParamsString.sort
        .split(',')
        .join(' ');
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery =
        this.mongooseQuery.sort('-createdAt');
    }
    return this;
  }
  limitFields() {
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
    if (this.queryParamsString.fields) {
      const fields = this.queryParamsString.fields
        .split(',')
        .join(' ');
      this.mongooseQuery =
        this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery =
        this.mongooseQuery.select('-__v');
    }

    return this;
  }

  paginate() {
    // 4) Pagination
    const page = this.queryParamsString.page * 1 || 1;
    const limit = this.queryParamsString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.mongooseQuery = this.mongooseQuery
      .skip(skip)
      .limit(limit);

    return this;
  }
}
module.exports = APIFeatures;
