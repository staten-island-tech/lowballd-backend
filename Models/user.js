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
  description: {
    type: String,
    trim: true,
    default: "",
  },
  profile_picture: {
    type: String,
    trim: true,
    default: "",
  },
  slug: String,
  totalFollowing: {
    type: Array,
    default: "",
  },
  totalFollowers: {
    type: Array,
    default: "",
  },
});
userSchema.pre("save", function (next) {
  if (!this.isModified("username", "email", "description")) {
    next();
    return;
  }
  this.slug = slugify(this.username);
  next();
});
module.exports = mongoose.model("authentication", userSchema, "authentication");
