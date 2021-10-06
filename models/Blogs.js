const mongoose = require("mongoose");

const BlogsSchema = mongoose.Schema({
  author_name: { type: String, required: true },
  author_avatar: { type: String },
  post: {
    post_date: { type: Date, default: Date.now },
    article_title: { type: String, required: true },
    article_content: { type: String, required: true },
  },
});

module.exports = mongoose.model("Blogs", BlogsSchema);
