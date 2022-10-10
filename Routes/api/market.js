const express = require("express");
const router = new express.Router();
const marketController = require("../../Controllers/marketPostController");
const MarketPost = require("../../Models/marketPost");

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

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
    folder: "Market Images",
  },
});

const upload = multer({ storage: storage });

router.get("/", marketController.getPosts);
router.get("/search", marketController.getPostsKeyword);
router.get("/profile/:id", marketController.getMarketPostsByMe);
router.get("/:id", marketController.getPostByID);

router.post("/upload", upload.array("pictures", 5), async (req, res) => {
  console.log(req.body);
  const post = new MarketPost({
    userId: req.body.userId,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    size: req.body.size,
    condition: req.body.condition,
    category: req.body.category,
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
});

router.patch("/update/:id", checkJwt, marketController.updatePost);
router.delete("/delete/:id", marketController.deletePost);
module.exports = router;
