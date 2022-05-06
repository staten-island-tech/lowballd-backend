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
  email_verified: {
    type: Boolean,
    default: false,
  },
});
/* userSchema.pre("save", function (next) {
  if (!this.isModified("username", "description")) {
    next();
    return;
  }
  this.slug = slugify(this.username);
  next();
}); */
userSchema.pre("save", async function (next) {
  if (!this.isModified("email")) return next();

  this.email_verified = false;
});

module.exports = mongoose.model("authentication", userSchema, "authentication");
