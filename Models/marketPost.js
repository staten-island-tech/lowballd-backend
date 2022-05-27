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
    description: {
      type: String,
      trim: true,
      required: "Please provide a description",
    },
    category: {
      type: String,
      trim: true,
      required: "Please provide a category",
    },
    price: {
      type: Number,
      trim: true,
      required: "Please enter a list price",
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
    slug: String,
    tags: [String],
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
marketPostSchema.pre("save", function (next) {
  if (
    !this.isModified(
      "userId",
      "title",
      "description",
      "category",
      "price",
      "size",
      "condition"
    )
  ) {
    next();
    return;
  }
  this.slug = slugify(this.title);
  next();
});
module.exports = mongoose.model("marketPosts", marketPostSchema);
