const express = require("express");
const router = express.Router();
const Blog = require("../models/Blogs");

// Getting all
router.get("/", async (req, res) => {
  try {
    const blog = await Blog.find();
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

// Getting one
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

// Creating one
router.post("/", async (req, res) => {
  try {
    const blog = new Blog({
      author_name: req.body.author_name,
      author_avatar: req.body.author_avatar,
      post: {
        article_title: req.body.post.article_title,
        article_content: req.body.post.article_content,
      },
    });
    blog
      .save()
      .then((data) => res.status(200).json(data))
      .catch((err) => res.json({ msg: err }));
  } catch (error) {}
});

// Updating one
router.patch("/:id", async (req, res) => {
  try {
    const blog = Blog.findByIdAndUpdate(req.params.id, {
      author_name: req.body.author_name,
      author_avatar: req.body.author_avatar,
      post: {
        article_title: req.body.post.article_title,
        article_content: req.body.post.article_content,
      },
    });
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

// Deleting one
router.delete("/:id", async (req, res) => {
  try {
    const blog = Blog.findByIdAndRemove(req.params.id);
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

module.exports = router;
