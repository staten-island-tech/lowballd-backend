const mongoose = require("mongoose");
const slugify = require("slugify");
const feedPostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    images: [
      {
        type: String,
        trim: true,
        required: "Please provide an image",
      },
    ],
    description: {
      type: String,
      trim: true,
      required: "Please provide a description",
    },
    date: {
      type: String,
      required: "Please provide a date",
    },
    slug: String,
    tags: [String],
    likes: {
      type: Array,
      default: null,
    },
    author: {
      type: String,
    },
  },
  { timestamps: true }
);
feedPostSchema.pre("save", function (next) {
  if (!this.isModified("description", "date", "title", "userId")) {
    next();
    return;
  }
  this.slug = slugify(this.title);
  next();
});
module.exports = mongoose.model("feedPosts", feedPostSchema);
