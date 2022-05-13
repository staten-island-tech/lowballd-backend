const mongoose = require("mongoose");
const slugify = require("slugify");
const feedPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    img: {
      type: String,
      trim: true,
      required: "Please provide an image",
    },

    description: {
      type: String,
      trim: true,
      required: "Please provide a description",
    },

    slug: String,
    tags: [String],
    likes: {
      type: Array,
      default: null,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
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
module.exports = mongoose.model("feedPosts", feedPostSchema);
