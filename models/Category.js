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

  static collectionName() {
    return 'categories';
  }
}

module.exports = Category;
