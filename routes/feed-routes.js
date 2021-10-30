const express = require("express");
const { getAllFeeds, addFeed, getFeed, updateFeed, deleteFeed } = require("../controllers/feedController");
const router = express.Router();

router.get("/feeds", getAllFeeds);
router.post("/feeds", addFeed);
router.get("/feeds/:id", getFeed);
router.put("/feeds/:id", updateFeed);
router.delete("/feeds/:id", deleteFeed);
module.exports = {
  routes: router,
};
