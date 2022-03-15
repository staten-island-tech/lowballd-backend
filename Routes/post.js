const express = require("express");
const router = new express.Router();
const postController = require("../Controllers/postController");

router.get("/profile/posts", postController.getPosts);
router.post("/profile/add", postController.createPost);
router.patch("/shop/:id", postController.updatePost);
router.delete("/shop/:id", postController.deletePost);
module.exports = router;
