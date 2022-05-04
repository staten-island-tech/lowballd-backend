const mongoose = require("mongoose");
const slugify = require("slugify");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  profile_picture: {
    type: String,
    trim: true,
  },
  slug: String,
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
