const categories = require('./categories');
// import articles from './articles';
const Category = require('../models/Category');
// import Article from '../models/Article';

let i = 0;

function recursiveCatCreate(j) {
  if (j < categories.length) {
    console.log(`Index j = ${j} inside array length`);
    const tmp = Category.create({
      title: categories[j].title,
      description: categories[j].description,
    });
    return tmp.save().then((prev) => {
      console.log(prev);
      i++;
      console.log(`Counter i = ${i}`);
      recursiveCatCreate(i);
    });
  }
  return null;
}

module.exports = function initDb() {
  console.log('DB INIT');
  i = 0;

  // Default Categories check
  Category.count().then((cats) => {
    if (cats === 0) {
      return recursiveCatCreate(i);
    }
    console.log(`Categories found: ${cats}`);
    return null;
  });
  // Default Articles check
};
