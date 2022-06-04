const marketPost = require("../Models/marketPost");

exports.getPosts = async (req, res) => {
  try {
    const post = await marketPost.find(); //.limit is limiting how many things pop up upon request
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
};

exports.getMarketPostsByMe = async (req, res) => {
  try {
    const myMarketPost = await marketPost.find({ userId: req.params.id });
    res.status(200).json(myMarketPost);
  } catch (error) {
    console.log(error);
  }
};
exports.getPostByID = async (req, res) => {
  try {
    const post = await marketPost.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.getPostsKeyword = async (req, res) => {
  try {
    console.log(req.body);
    const post = await marketPost.find({
      title: { $regex: req.body.title, $options: "i" },
    });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await marketPost.findById(req.params.id);
    const updates = Object.keys(req.body);
    updates.forEach((update) => (post[update] = req.body[update]));
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await marketPost.findOneAndDelete(req.params.id);
    if (!post) {
      res.status(404).send();
    }
    res.status(200).send(`${post.title} was deleted from the DB`);
  } catch (error) {
    console.log(error);
  }
};
