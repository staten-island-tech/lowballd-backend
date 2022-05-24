const feedPost = require("../Models/feedPost");
const MarketPost = require("../Models/marketPost");

exports.getPosts = async (req, res) => {
  try {
    const post = await feedPost.find().limit(100); //.limit is limiting how many things pop up upon request
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

exports.getPostsByMe = async (req, res) => {
  try {
    const myFeedPost = await feedPost.find({ userId: req.params.id });
    // const myMarketPost = await MarketPost.find({ userId: req.params.id });
    // const myPost = [];
    // myPost.push(myFeedPost, myMarketPost);
    res.json(myFeedPost);
  } catch (error) {
    console.log(error);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await feedPost.findById(req.params.id);
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
    const post = await feedPost.findOneAndDelete(req.params.id);
    if (!post) {
      res.status(404).send();
    }
    res.send(`${post.title} was deleted from the DB`);
  } catch (error) {
    console.log(error);
  }
};
