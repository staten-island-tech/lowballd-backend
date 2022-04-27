const express = require("express");
const router = new express.Router();
const postController = require("../../Controllers/postController");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const MarketPost = require("../../Models/marketPost");
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
const MarketPost = require("../../Models/marketPost");

router.get("/", postController.getPosts);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "DEV",
  },
});

const upload = multer({ storage: storage });

router.post("/upload", checkJwt, upload.single("picture"), async (req, res) => {
  console.log(req.file.path);
  const result = req.file.path;
  console.log(result);
  const post = new MarketPost({
    title: req.body.title,
    img: result,
    price: req.body.price,
    description: req.body.caption,
    style: req.body.style,
    brand: req.body.brand,
    size: req.body.size,
    condition: req.body.condition,
    color: req.body.color,
    tags: req.body.tags,
  });
  console.log(req.body);
  await post.save();
  res.json({ picture: req.file.path });
});

router.patch("/update/:id", checkJwt, postController.updatePost);
router.delete("/delete/:id", checkJwt, postController.deletePost);
module.exports = router;
