class ApiFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    search() {
        const keyword = this.queryString.keyword
            ? {
                  name: {
                      $regex: this.queryString.keyword,
                      $options: "i",
                  },
              }
            : {};
        this.query = this.query.find({ ...keyword });
        return this;
    }
    filter() {
        let queryCopy = { ...this.queryString }; // copy not referenced
        // removing some fields for category
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key) => delete queryCopy[key]);
        // filter for price and rating
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        queryCopy = JSON.parse(queryStr);
        this.query = this.query.find(queryCopy);
        return this;
    }
    pagination(resultPerPage) {
        const currentPage = Number(this.queryString.page) || 1;
        // how many products you wanna skip
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

export default ApiFeatures;
