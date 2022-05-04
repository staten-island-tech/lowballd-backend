const mongoose = require("mongoose");
const slugify = require("slugify");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: "Please provide an email or update email",
    unique: true,
  },
  profile_picture: {
    type: String,
    trim: true,
    required: "Please upload a profile picture",
  },
  slug: String,
  tags: [String],
  totalFollowing: {
    type: Number,
    default: 0,
  },
  totalFollowers: {
    type: Number,
    default: 0,
  },
});
userSchema.pre("save", function (next) {
  if (!this.isModified("caption", "price", "title")) {
    next();
    return;
  }
  this.slug = slugify(this.username);
  next();
});
module.exports = mongoose.model("authentication", userSchema, "authentication");
