const mongoose = require('mongoose'); // return a Singleton object

const articleSchema = new mongoose.Schema({
  author: String,
  subject: String,
  contents: String,
  category: String,
  tags: [String],
  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('articles', articleSchema);
