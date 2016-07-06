const EmbeddedDocument = require('camo').EmbeddedDocument;

class Comment extends EmbeddedDocument {
  constructor() {
    super();
    this.schema({
      subject: String,
      body: String,
      author: String,
      email: String,
      date: String,
    });
  }
}

module.exports = Comment;
