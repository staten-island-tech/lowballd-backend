const Post = require("../Models/posts");

exports.createPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getPosts = async (req, res) => {
  try {
    const post = await Post.find().limit(3); //.limit is limiting how many things pop up upon request
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const updates = Object.keys(req.body);
    updates.forEach((update) => (post[update] = req.body[update]));
    await post.save();
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      res.status(404).send();
    }
    res.send(`${post.name} was deleted from the DB`);
  } catch (error) {
    console.log(error);
  }
};
