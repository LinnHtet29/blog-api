const express = require("express");
const router = express.Router();
const blogController = require("../controller/blogController");

router.get("/", blogController.blog_show);
router.post("/post", blogController.blog_post);
router.get("/:id", blogController.blog_single);
router.delete("/delete/:id", blogController.blog_remove);
router.put("/edit/:id", blogController.blog_update);

module.exports = router;
