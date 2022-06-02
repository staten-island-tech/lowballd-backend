const comments = require("../Models/comments");

exports.createComment = async (req, res) => {
  const comment = new comments({
    ...req.body,
    userId: req.body.userId,
  });
  try {
    await comment.save();
    res.send(comment);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getFeedPostsByMe = async (req, res) => {
  try {
    const myFeedPost = await feedPost.find({ userId: req.params.id });
    res.status(200).json(myFeedPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getPostByID = async (req, res) => {
  try {
    const post = await feedPost.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await feedPost.findById(req.params.id);
    const updates = Object.keys(req.body);
    updates.forEach((update) => (post[update] = req.body[update]));
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await feedPost.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("Liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("Disliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.commentOnPost = async (req, res) => {
  try {
    const post = await feedPost.findById(req.params.id);
    await post.updateOne({ $push: { comments: req.body.userId } });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await feedPost.findOneAndDelete(req.params.id);
    if (!post) {
      res.status(404).send();
    }
    res.send(`${post.title} was deleted from the DB`);
  } catch (error) {
    res.status(500).json(error);
  }
};
