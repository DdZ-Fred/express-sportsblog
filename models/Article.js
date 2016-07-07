const Document = require('camo').Document;
const Comment = require('./Comment');

class Article extends Document {

  // Hooks here

  constructor() {
    super();

    this.schema({
      title: String,
      subtitle: String,
      category: String,
      body: String,
      author: String,
      created_at: {
        type: Date,
        default: new Date(),
      },
      comments: {
        type: [Comment],
        default: [],
      },
    });
  }

  static findById(id) {
    return this.findOne({ _id: id });
  }

  static findAll() {
    return this.find({}, {
      sort: [
        'title',
        'created_at',
      ],
    });
  }

  static collectionName() {
    return 'articles';
  }
  // Other Hooks here
}

module.exports = Article;
