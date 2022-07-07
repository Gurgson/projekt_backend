class APIfeatures {
  exludedFileds = ['page', 'sort', 'limit', 'fields'];
  constructor(query, queryString) {
    this.queryString = query;
    this.queryString = queryString;
  }
  filter() {
    const queryObject = { ...this.queryString };
    this.exludedFileds.forEach((el) => delete queryObject[el]);
    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace(
      /\b(gte||gt||lte|lte)\b/g,
      (match) => `$${match}`
    );
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    }
    return this;
  }
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query.select(fields);
    }
    this.query.select('-__v');
    return this;
  }
  paginate() {
    const page = this.queryString.page * 1 ?? 1;
    const limit = this.queryString.limit * 1 ?? 20;
    const skip = (page - 1) * limit;

    this.query = query.skip(skip).limit(limit);
    return this;
  }
}
