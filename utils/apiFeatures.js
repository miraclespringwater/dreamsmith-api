class APIFeatures {
  // definitely could use better input param names...
  // constructor(db query obj to be awaited, query params)
  constructor(mongooseQuery, queryParamsString) {
    this.mongooseQuery = mongooseQuery;
    this.queryParamsString = queryParamsString;
  }

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

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    this.mongooseQuery = this.mongooseQuery.find(
      JSON.parse(queryStr)
    );

    return this;
  }

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
