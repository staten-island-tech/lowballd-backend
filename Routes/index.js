const express = require("express");
const router = new express.Router();
const shopController = require("../Controllers/shopController");

router.get("/", shopController.middlewareSample, shopController.homepage);
router.get("/auth", shopController.authMiddleware, shopController.authPage);
module.exports = router;
