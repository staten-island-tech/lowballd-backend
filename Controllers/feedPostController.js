const feedPost = require("../Models/feedPost");
const comments = require("../Models/comments");
exports.getPosts = async (req, res) => {
  try {
    const post = await feedPost.find().limit(100); //.limit is limiting how many things pop up upon request
    res.status(200).json(post);
  } catch (error) {
    res.send(error);
  }
};

exports.getFeedPostsByMe = async (req, res) => {
  try {
    const myFeedPost = await feedPost.find({ userId: req.params.id });
    res.status(200).json(myFeedPost);
  } catch (error) {
    res.send(error);
  }
};

exports.getPostByID = async (req, res) => {
  try {
    const post = await feedPost.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.send(error);
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
    res.send(error);
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
    res.send(error);
  }
};
exports.commentOnPost = async (req, res) => {
  try {
    const post = await feedPost.findById(req.params.id);
    const comment = new comments({
      userId: req.body.userId,
      comment: req.body.comment,
      date: req.body.date,
    });

    post.comments.push(comment);
    // post["comments"] = comment;
    await post.save();
    res.json(post);
  } catch (error) {
    res.send(error);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await feedPost.findByIdAndDelete(req.params.id);
    if (!post) {
      res.status(404).send();
    }
    res.send(`${post.title} was deleted from the DB`);
  } catch (error) {
    res.send(error);
  }
};
