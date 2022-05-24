const express = require("express");
const router = new express.Router();
const feedController = require("../../Controllers/feedPostController");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const feedPost = require("../../Models/feedPost");
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

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Feed Images",
  },
});
const upload = multer({ storage: storage });

router.get("/", feedController.getPosts);
router.get("/profile/:id", feedController.getPostsByMe);

router.post("/upload", upload.array("pictures", 5), async (req, res) => {
  try {
    const post = new feedPost({
      userId: req.body.userId,
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
    });
    if (!req.files) return res.send("Please upload a file");
    if (req.files) {
      const imageURIs = [];
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        imageURIs.push(path);
      }
      post["images"] = imageURIs;
      console.log(req.body);
      await post.save();
      return res.status(201).json({ post });
    }

    if (req.file && req.file.path) {
      // if only one image uploaded
      post["images"] = req.file.path; // add the single
      await post.save();
      return res.status(201).json({ post });
    }
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

router.patch("/update/:id", feedController.updatePost);
router.delete("/delete/:id", checkJwt, feedController.deletePost);
module.exports = router;
