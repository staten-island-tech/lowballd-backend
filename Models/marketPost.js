const mongoose = require("mongoose");
const slugify = require("slugify");
const marketPostSchema = new mongoose.Schema(
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
    price: {
      type: Number,
      trim: true,
      required: "Please enter a list price",
    },
    description: {
      type: String,
      trim: true,
      required: "Please provide a description",
    },
    style: {
      type: String,
      trim: true,
      required: "Please provide a style",
    },
    brand: {
      type: String,
      trim: true,
      required: "Please provide the brand of the product",
    },
    size: {
      type: String,
      required: "Please provide a size",
    },
    condition: {
      type: String,
      trim: true,
      required: "Please provide the condition of the product",
    },
    color: {
      type: String,
      trim: true,
      required: "Please provide a color",
    },
    slug: String,
    tags: [String],
    likes: {
      type: Number,
      default: 0,
    },
    categories: {
      type: String,
      trim: true,
      required: "Please provide a category",
    },
  },
  { timestamps: true }
);
marketPostSchema.pre("save", function (next) {
  if (!this.isModified("caption", "price", "title")) {
    next();
    return;
  }
  this.slug = slugify(this.title);
  next();
});
module.exports = mongoose.model("marketPosts", marketPostSchema);
