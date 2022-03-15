const express = require("express");
const router = new express.Router();
const userController = require("../../Controllers/userController");

router.get("/profile/posts", userController.getPosts);
router.post("/profile/add", userController.createPost);
router.patch("/shop/:id", userController.updatePost);
router.delete("/shop/:id", userController.deletePost);
module.exports = router;
