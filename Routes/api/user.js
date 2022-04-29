const express = require("express");
const router = new express.Router();
const userController = require("../../Controllers/userController");

router.get("/profile/", userController.getUser);
router.post("/create", userController.createUser);
router.patch("/update/:id", userController.updateUser);
router.delete("/delete/id", userController.deleteUser);
module.exports = router;
