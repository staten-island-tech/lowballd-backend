const mongoose = require("mongoose");
const slugify = require("slugify");
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  caption: {
    type: String,
    trim: true,
    required: "Please provide a description",
  },
  price: {
    type: String,
    trim: true,
    required: "Please enter a list price",
  },
  slug: String,
  tags: [String],
});
postSchema.pre("save", function (next) {
  if (!this.isModified("caption", "price", "title")) {
    next();
    return;
  }
  this.slug = slugify(this.title);
  next();
});
module.exports = mongoose.model("Shop", postSchema);
