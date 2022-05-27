const express = require("express");
const router = new express.Router();
const userController = require("../../Controllers/userController");
const User = require("../../Models/user");

const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-5t61kzw2.us.auth0.com/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer
  audience: "http://localhost:3001/api", //replace with your API's audience, available at Dashboard > APIs
  issuer: "https://dev-5t61kzw2.us.auth0.com/",
  algorithms: ["RS256"],
});

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "pfp",
  },
});
const upload = multer({ storage: storage });

// //HANDLE ERRORS
// const handleErrors = (err) => {
//   console.log(err.message, err.code);

//   // validation errors
//   if (err.message.includes("authentication validation failed")) {
//     // console.log(err);
//     // Object.values(err.errors).forEach(({ properties }) => {
//     //   errors[properties.path] = properties.message;
//     // });
//   }
// };

router.get("/:id", userController.getUser);
router.put("/:id/follow", userController.followUser);
router.put("/:id/unfollow", userController.unfollowUser);
router.patch("/update/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const updates = Object.keys(req.body);
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    console.log(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//This doesn't work yet because I need to figure out what needs to happen for a person to follow another person.

router.patch(
  "/update/pfp/:id",
  checkJwt,
  upload.single("picture"),
  async (req, res) => {
    try {
      const result = req.file.path;
      const user = await User.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          profile_picture: result,
        },

        {
          new: true,
        }
      ).exec();
      await user.save();
      res.json(user);
      console.log(req.file.path);
      console.log(user);
    } catch (err) {
      handleErrors(err);
    }
  }
);
router.delete("/delete/:id", checkJwt, userController.deleteUser);
module.exports = router;
