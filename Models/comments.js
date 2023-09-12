const mongoose = require("mongoose");
const Comment = mongoose.model("Comment", {
  userId: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
});

module.exports = Comment;
