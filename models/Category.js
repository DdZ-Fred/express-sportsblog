const Document = require('camo').Document;

class Category extends Document {
  constructor() {
    super();

    this.schema({
      title: String,
      description: String,
      created_at: {
        type: Date,
        default: new Date(),
      },
    });
  }

  static findById(id) {
    return this.findOne({ _id: id });
  }

  static findAll() {
    return this.find({}, {
      sort: 'title',
    });
  }

  static collectionName() {
    return 'categories';
  }
}

module.exports = Category;
