const User = require("../Models/user");
//handle errors
const handleErrors = (err) => {
  console.log(err.message);
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); //.limit is limiting how many things pop up upon request
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* exports.updateUserInfo =  */

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.users.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).send();
    }
    res.send(`${user.username} was deleted from the DB`);
  } catch (err) {
    handleErrors(err);
  }
};
