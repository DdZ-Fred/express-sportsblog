const Document = require('camo').Document;

class Article extends Document {

  // Hooks here

  constructor() {
    super();

    this.schema({
      title: String,
      body: String,
    });
  }

  static collectionName() {
    return 'articles';
  }
  // Other Hooks here
}

module.exports = Article;
