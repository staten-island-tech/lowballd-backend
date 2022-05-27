const marketPost = require("../Models/marketPost");

exports.getPosts = async (req, res) => {
  try {
    const post = await marketPost.find(); //.limit is limiting how many things pop up upon request
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

exports.getMarketPostsByMe = async (req, res) => {
  try {
    const myMarketPost = await marketPost.find({ userId: req.params.id });
    res.json(myMarketPost);
  } catch (error) {
    console.log(error);
  }
};

exports.getPostsKeyword = async (req, res) => {
  try {
    console.log(req.body);
    const post = await marketPost.find({ title: req.body.title });

    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await marketPost.findById(req.params.id);
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
    const post = await marketPost.findOneAndDelete(req.params.id);
    if (!post) {
      res.status(404).send();
    }
    res.send(`${post.title} was deleted from the DB`);
  } catch (error) {
    console.log(error);
  }
};
