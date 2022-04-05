const mongoose = require("mongoose");
const slugify = require("slugify");
const postSchema = new mongoose.Schema(
  {
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
    img: {
      type: String,
      trim: true,
      required: "Please provide an image",
    },
    size: {
      type: String,
      required: "Please provide a size",
    },
    price: {
      type: Number,
      trim: true,
      required: "Please enter a list price",
    },
    slug: String,
    tags: [String],
  },
  { timestamps: true }
);
postSchema.pre("save", function (next) {
  if (!this.isModified("caption", "price", "title")) {
    next();
    return;
  }
  this.slug = slugify(this.title);
  next();
});
module.exports = mongoose.model("Shop", postSchema);
