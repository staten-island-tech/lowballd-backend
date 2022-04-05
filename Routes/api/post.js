const express = require("express");
const router = new express.Router();
const postController = require("../../Controllers/postController");

router.get("/", postController.getPosts);
router.post("/add", postController.createPost);
router.patch("/update/:id", postController.updatePost);
router.delete("/delete/:id", postController.deletePost);
module.exports = router;
