const User = require("../Models/user");

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.users.save();
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).limit(6); //.limit is limiting how many things pop up upon request
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.users.findById(req.params.id);
    const updates = Object.keys(req.body);
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.users.save();
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.users.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).send();
    }
    res.send(`${user.username} was deleted from the DB`);
  } catch (error) {
    console.log(error);
  }
};
